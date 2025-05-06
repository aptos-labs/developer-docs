import dynamic from "next/dynamic";

export const DynamicPreloadSearch = dynamic(() => import("./PreloadSearch"), {
  ssr: false,
});
