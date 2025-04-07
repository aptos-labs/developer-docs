import dynamic from "next/dynamic";
import GraphQLSkeleton from "../GraphQLSkeleton";

/**
 * Dynamic NFTGraphQLEditor
 *
 * Next.js must render this as a client-side component. It is not server side renderable
 * largely due to access to the window object (localstorage) and client side state.
 *
 * Loading states are provided through the <GraphQLSkeleton /> component
 */
export const NFTGraphQLEditor = dynamic(() => import("./NFTGraphQL"), {
  ssr: false,
  loading: () => <GraphQLSkeleton />,
});

export default NFTGraphQLEditor;
