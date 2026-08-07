import { factory } from "../../../lib";

export const getUserApp = factory.createApp().get("/", async (c) => {
  return c.json({data:null});
})
