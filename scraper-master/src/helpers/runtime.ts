import dotenv from "dotenv"
dotenv.config()

const RuntimeHelper = {
    env: process.env.NODE_ENV || "production"
}
export default RuntimeHelper;