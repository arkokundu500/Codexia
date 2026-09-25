import { Cashfree, CFEnvironment } from "cashfree-pg"
import dotenv from "dotenv"
dotenv.config()

const env = process.env.CASHFREE_ENV === "SANDBOX"
    ? CFEnvironment.SANDBOX
    : CFEnvironment.PRODUCTION

const cashfree = new Cashfree(
    env,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
)

export default cashfree
