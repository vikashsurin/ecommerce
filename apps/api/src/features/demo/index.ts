import { factory } from "../../lib";
import { getDemo } from "./get/handler";

export const demoApp = factory.createApp().route("/", getDemo);
