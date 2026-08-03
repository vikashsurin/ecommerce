import { Hono } from "hono";
import { uploadImageApp } from "./upload-image/handler";

export const productImagesApp= new Hono()
  .route("/", uploadImageApp);
