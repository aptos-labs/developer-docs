import dynamic from "next/dynamic";

export const DynamicApiReference = dynamic(() => import("./ApiReference"), {
  ssr: false,
});
