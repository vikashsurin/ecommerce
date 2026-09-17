import { factory } from "../../lib";
import { getDemoHandler} from "./get/handler";

export const demoApp = factory.createApp().get("/", ...getDemoHandler);
