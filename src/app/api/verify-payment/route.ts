import Razorpay from "razorpay";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = Razorpay.validateWebhookSignature(
      body,
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET
    );

    if (expectedSignature) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(400).json({ status: "failed", message: "Invalid signature" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
