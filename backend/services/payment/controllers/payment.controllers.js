import cashfree from "../config/cashfree.js"
import Payment from "../models/payment.model.js"
import { addCredits } from "../utils/updateCredits.js"

const Plans = {
    pro: {
        name: "Pro",
        amount: 299,
        credits: 500,
    },
    team: {
        name: "Team",
        amount: 799,
        credits: 2000,
    },
}

export const createOrder = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        if (!userId) {
            return res.status(400).json({ message: "userid is not found" })
        }
        const { plan } = req.body
        const selectedPlan = Plans[plan]
        if (!selectedPlan) {
            return res.status(400).json({ message: "plan is not found" })
        }

        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`

        const response = await cashfree.PGCreateOrder({
            order_id: orderId,
            order_amount: selectedPlan.amount,
            order_currency: "INR",
            customer_details: {
                customer_id: String(userId),
                customer_phone: "9999999999",
                customer_email: "user@codexia.app"
            },
            order_meta: {
                return_url: `${process.env.FRONTEND_URL || "https://d1vbsvfbkgp6gf.cloudfront.net"}/plan?order_id={order_id}`
            },
            order_note: `Codexia Plan ${selectedPlan.name}`
        })

        const orderData = response.data

        await Payment.create({
            userId,
            plan,
            credits: selectedPlan.credits,
            amount: selectedPlan.amount,
            cashfreeOrderId: orderId,
            currency: "INR",
            status: "created"
        })

        return res.status(201).json({
            order_id: orderId,
            payment_session_id: orderData.payment_session_id,
            order: {
                id: orderId,
                amount: selectedPlan.amount,
                currency: "INR"
            },
            plan: {
                name: selectedPlan.name,
                credits: selectedPlan.credits
            }
        })

    } catch (error) {
        console.error("Create order error:", error?.response?.data || error)
        return res.status(500).json({ message: `create order error ${error.message || error}` })
    }
}

export const verify = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        if (!userId) {
            return res.status(400).json({ message: "userid is not found" })
        }
        const { order_id } = req.body
        if (!order_id) {
            return res.status(400).json({ message: "order_id not found" })
        }

        const payment = await Payment.findOne({
            cashfreeOrderId: order_id
        })

        if (!payment) {
            return res.status(404).json({ message: "payment is not found" })
        }

        if (payment.status === "paid") {
            return res.status(200).json({ message: "payment already verified", status: "paid" })
        }

        // Fetch order details from Cashfree
        const orderRes = await cashfree.PGFetchOrder(order_id)
        const orderData = orderRes.data

        // Also fetch payments for transaction ID if available
        let cfPaymentId = null
        try {
            const paymentsRes = await cashfree.PGOrderFetchPayments(order_id)
            const successfulPayment = (paymentsRes.data || []).find(p => p.payment_status === "SUCCESS")
            if (successfulPayment) {
                cfPaymentId = String(successfulPayment.cf_payment_id)
            }
        } catch (fetchErr) {
            console.warn("Could not fetch payment details:", fetchErr.message)
        }

        if (orderData.order_status === "PAID" || cfPaymentId) {
            payment.status = "paid"
            payment.cashfreePaymentId = cfPaymentId || String(orderData.cf_order_id)
            await payment.save()

            await addCredits({ userId, credits: payment.credits })

            return res.status(200).json({
                message: "payment verified",
                status: "paid",
                creditsAdded: payment.credits
            })
        } else {
            return res.status(400).json({
                message: `Payment status is ${orderData.order_status}`,
                status: orderData.order_status
            })
        }

    } catch (error) {
        console.error("Verify payment error:", error?.response?.data || error)
        return res.status(500).json({ message: `verify payment error ${error.message || error}` })
    }
}
