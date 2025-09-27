import express from "express";

const router = express.Router();

function getJsonBody(req: express.Request): Record<string, unknown> {
  const body = req.body as unknown;
  if (Buffer.isBuffer(body)) {
    const str = body.toString("utf8");
    try {
      return JSON.parse(str) as Record<string, unknown>;
    } catch {
      throw new Error("Invalid JSON body");
    }
  }
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as Record<string, unknown>;
    } catch {
      throw new Error("Invalid JSON body");
    }
  }
  if (body && typeof body === "object") {
    return body as Record<string, unknown>;
  }
  return {};
}

router.get("/", (_req, res) => {
  res.status(200).send("ClickUp webhook endpoint");
});

router.post("/", (req, res) => {
  try {
    const payload = getJsonBody(req);
    console.log(JSON.stringify(payload, null, 2));
    // TODO: handle ClickUp webhook events as needed
    // e.g., inspect payload.event, payload.history_items, etc.
    res.status(200).json({ received: true });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;

