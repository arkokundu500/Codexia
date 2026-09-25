import Redis from "ioredis"

const redisUrl = (process.env.REDIS_URL || "redis://localhost:6379").replace(/^http:\/\//, "redis://")

const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false
})

redis.on("connect", () => {
    console.log("Redis connected")
})

redis.on("error", (err) => {
    console.error("Redis error:", err.message)
})

export default redis
