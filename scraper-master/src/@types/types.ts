export type TypeJob = {
    url: String,
    status: "free" | "reserved" | "done" | "failed",
    contentHashId: String
}