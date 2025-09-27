import "dotenv/config";
import express from "express";
import clickupWebhookRoutes from "./routes/clickupWebhook";

const app = express();

// Shopify requires raw body for HMAC verification
app.use(express.raw({ type: "application/json" }));


app.use("/webhook/clickup", clickupWebhookRoutes);

app.get("/", (_req, res) => {
  res.send("Shopify webhook server is running 🚀");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
