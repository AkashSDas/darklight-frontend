// import { Urbanist } from "@next/font/google";
import localFont from "@next/font/local";

// const urbanist = Urbanist({ variable: "--font-urbanist" });

export const urbanist = localFont({
  src: [
    {
      path: "../public/fonts/urbanist/regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/urbanist/medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/urbanist/semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/urbanist/bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/urbanist/extrabold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-urbanist",
});

export const gilroy = localFont({
  src: "../public/fonts/gilroy-extrabold.otf",
  variable: "--font-gilroy",
});
