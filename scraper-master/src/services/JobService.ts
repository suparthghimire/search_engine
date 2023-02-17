import { Job, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { Socket } from "socket.io-client";
import { TypeJob } from "../@types/types";
import Log from "../helpers/log";
const prisma = new PrismaClient();

const JobService = {
    findJobByUrl: async (url: string) => {
        return await prisma.job.findFirst({ where: { url } })
    },
    createJob: async (job: TypeJob) => {
        return await prisma.job.create({
            data: {
                url: String(job.url),
                status: job.status,
                contentHashId: String(job.contentHashId),
            }
        })
    },
    createJobIfNotExists: async (job: TypeJob) => {
        let item = await JobService.findJobByUrl(String(job.url))
        if (item === null) {
            return await JobService.createJob(job) && true;
        }
        return false;
    },
    reserveJob: async (id: number, socket: Socket) => {
        return await prisma.job.update({
            where: {
                id
            },
            data: {
                status: "reserved",
                dispatchToken: randomUUID(),
                dispatchAgent: socket.id,
            }
        })
    },
    releaseJob: async (id: number) => {
        return await prisma.job.update({
            where: {
                id
            },
            data: {
                status: "free",
                dispatchToken: null
            }
        })
    },
    releaseAllJob: async () => {
        return await prisma.job.updateMany({
            where: {},
            data: {
                status: "free",
                dispatchToken: null
            }
        })
    },
    releaseAllReservedJob: async () => {
        return await prisma.job.updateMany({
            where: {
                status: "reserved"
            },
            data: {
                status: "free",
                dispatchToken: null
            }
        })
    },
    releaseAllReservedJobByAgentId: async (id: string) => {
        Log.log("Job Release", "Abandoned jobs by client : " + id + " released")
        return await prisma.job.updateMany({
            where: {
                status: "reserved",
                dispatchAgent: id,
            },
            data: {
                status: "free",
                dispatchToken: null,
                dispatchAgent: null
            }
        })
    },
    updateJob: async (job: Job) => {
        return await prisma.job.update({
            where: {
                id: job.id
            },
            data: job
        })
    },
    doneJob: async (id: number) => {
        return await prisma.job.update({
            where: {
                id: id
            },
            data: {
                status: "done",
                dispatchToken: null
            }
        })
    },
    failJob: async (id: number) => {
        return await prisma.job.update({
            where: {
                id: id
            },
            data: {
                status: "failed",
                dispatchToken: null
            }
        })
    },
    getJob: async () => {
        return await prisma.job.findFirst({
            where: {
                status: "free",
                dispatchToken: null
            },
            orderBy: {
                id: "asc"
            }
        })
    },
    getJobById: async (id: number) => {
        return await prisma.job.findFirst({
            where: {
                id
            }
        })
    }
}

export default JobService;