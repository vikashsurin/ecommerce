import { factory } from "../../../lib";

export const getDemo = factory.createApp().get("/", async (c) => {
  return c.json({ message: `Hello from the demo endpoint ` });
});
