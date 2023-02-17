import fs from "fs"

const FileService = {
    saveFile: (path: string, content: any) => {
        return fs.writeFileSync(path, content);
    },
    makeFolder: (path: string) => {
        if (!fs.existsSync(path)) {
            return fs.mkdirSync(path, { recursive: true })
        }
        return false;
    }
}
export default FileService