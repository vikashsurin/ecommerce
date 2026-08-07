import { factory } from "../../lib/factory";
import { getDemo } from "./get/handler";

export const demoApp = factory.createApp().route("/", getDemo);
