import type { MetadataRoute } from "next";
import {
  APP_DESCRIPTION,
  APP_NAME,
  ASSETS,
  PWA_BACKGROUND_COLOR,
  PWA_THEME_COLOR,
} from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: PWA_BACKGROUND_COLOR,
    theme_color: PWA_THEME_COLOR,
    icons: [
      {
        src: ASSETS.icons.icon192,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: ASSETS.icons.icon512,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
