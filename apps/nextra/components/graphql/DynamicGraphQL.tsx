import dynamic from "next/dynamic";
import GraphQLSkeleton from "./GraphQLSkeleton";

/**
 * Dynamic GraphQLEditor
 *
 * Next.js must render this as a client-side component. It is not server side renderable
 * largely due to access to the window object (localstorage) and client side state.
 *
 * Loading states are provided through the <GraphQLSkeleton /> component
 */
export const GraphQLEditor = dynamic(() => import("./NonDynamicGraphQL"), {
  ssr: false,
  loading: () => <GraphQLSkeleton />,
});

export default GraphQLEditor;
