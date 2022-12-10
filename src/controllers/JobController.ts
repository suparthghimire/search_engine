import { Socket } from "socket.io-client";
import Log from "../helpers/log";
import FileService from "../services/FileService";
import JobService from "../services/JobService";
import { join as pathJoin } from "path";
import { randomUUID } from "crypto";
import urlHelper from "../helpers/urlHelper";

const JobController = {
    onJobRequest: async (socket: Socket) => {

        Log.log("Job Request", socket.id + " requested a new job");

        let job = await JobService.getJob();

        if (job) {
            job = await JobService.reserveJob(job.id, socket);
            socket.emit("dispatch", job)
        }

        else {
            Log.log("No Job", "No job in the pool.");
            socket.emit("dispatch", null)
        }
    },
    onJobSubmit: async (socket: Socket, payload: any) => {
        try {
            let newJobsInserted = false;
            let originalJob = await JobService.getJobById(payload.job.id);
            if (originalJob && originalJob.dispatchToken === payload.job.dispatchToken && originalJob.dispatchAgent === socket.id) {
                if (payload.data !== null) {
                    // Fetch Successful
                    let path = pathJoin("storage", payload.job.contentHashId);
                    FileService.makeFolder(path)
                    FileService.saveFile(pathJoin(path, payload.job.contentHashId + ".txt"), payload.data.content)

                    // Sanitizing the links

                    FileService.saveFile(pathJoin(path, payload.job.contentHashId + ".json"), JSON.stringify({
                        url: originalJob.url,
                        title: payload.data.title,
                        description: payload.data.description,
                        keywords: payload.data.keywords,
                        links: payload.data.links.filter((link: string) => {
                            return (urlHelper.isValidURL(link) && urlHelper.isNpDomain(link)) ? link : false;
                        }),
                    }))
                    FileService.saveFile(pathJoin(path, payload.job.contentHashId.replace(/&quot;/g, '"') + ".html"), payload.data.html);

                    for await (const link of payload.data.links) {
                        if (urlHelper.isValidURL(link) && urlHelper.isNpDomain(link)) {
                            newJobsInserted = await JobService.createJobIfNotExists({
                                url: link,
                                status: "free",
                                contentHashId: randomUUID(),
                            })
                        }
                    }

                    newJobsInserted && socket.emit('dispatch_ready')
                    Log.log("Fetch Success", originalJob.url + " fetched successfully by client :" + socket.id)
                    await JobService.doneJob(originalJob.id)
                }

                else {
                    // Fetch Unsuccessful
                    Log.log("Fetch Failed", originalJob.url + " fetched failed by client :" + socket.id)
                    await JobService.doneJob(originalJob.id)
                }
            }

            else {
                Log.log("Conflict", "Dispatch token mismatch or false agent");
            }
        } catch (error) {
            Log.log("Error", error)
        }
        finally {
            socket.emit("processed")
        }
    }
}

export default JobController;