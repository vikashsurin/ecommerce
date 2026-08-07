import { appFactory } from "../../lib/factory"
import { getDemo } from "./get/handler"

export const demoApp = appFactory.route("/", getDemo)
