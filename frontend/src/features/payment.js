import { api } from "../utils/axios"

export const createPayment = async (plan) => {
    try {
        const { data } = await api.post("/api/payment/create", { plan })
        return data
    } catch (error) {
        console.error("Create payment error:", error)
        return null
    }
}

export const verifyPayment = async ({ order_id }) => {
    try {
        const { data } = await api.post("/api/payment/verify", { order_id })
        return data
    } catch (error) {
        console.error("Verify payment error:", error)
        return null
    }
}