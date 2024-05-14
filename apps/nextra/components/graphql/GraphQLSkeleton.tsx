export interface GraphQLIconProps {
  className: string;
}

export const GraphQLIcon = ({ className }: GraphQLIconProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.65674L20.9575 6.82836V17.1716L12 22.3432L3.04248 17.1716V6.82836L12 1.65674ZM4.04753 7.40863V15.006L10.6271 3.60994L4.04753 7.40863ZM12 3.24206L4.4154 16.379H19.5846L12 3.24206ZM18.5796 17.384H5.42045L12 21.1827L18.5796 17.384ZM19.9525 15.006L13.3729 3.60994L19.9525 7.40863V15.006Z"
      />
      <path d="M12 4.35381C13.1691 4.35381 14.1168 3.40609 14.1168 2.23701C14.1168 1.06793 13.1691 0.120209 12 0.120209C10.8309 0.120209 9.88319 1.06793 9.88319 2.23701C9.88319 3.40609 10.8309 4.35381 12 4.35381Z" />
      <path d="M20.455 9.23532C21.6241 9.23532 22.5718 8.2876 22.5718 7.11852C22.5718 5.94945 21.6241 5.00172 20.455 5.00172C19.2859 5.00172 18.3382 5.94945 18.3382 7.11852C18.3382 8.2876 19.2859 9.23532 20.455 9.23532Z" />
      <path d="M20.455 18.9983C21.6241 18.9983 22.5718 18.0506 22.5718 16.8815C22.5718 15.7124 21.6241 14.7647 20.455 14.7647C19.2859 14.7647 18.3382 15.7124 18.3382 16.8815C18.3382 18.0506 19.2859 18.9983 20.455 18.9983Z" />
      <path d="M12 23.8798C13.1691 23.8798 14.1168 22.9321 14.1168 21.763C14.1168 20.5939 13.1691 19.6462 12 19.6462C10.8309 19.6462 9.88319 20.5939 9.88319 21.763C9.88319 22.9321 10.8309 23.8798 12 23.8798Z" />
      <path d="M3.54382 18.9983C4.71289 18.9983 5.66062 18.0506 5.66062 16.8815C5.66062 15.7124 4.71289 14.7647 3.54382 14.7647C2.37474 14.7647 1.42702 15.7124 1.42702 16.8815C1.42702 18.0506 2.37474 18.9983 3.54382 18.9983Z" />
      <path d="M3.54382 9.23532C4.71289 9.23532 5.66062 8.2876 5.66062 7.11852C5.66062 5.94945 4.71289 5.00172 3.54382 5.00172C2.37474 5.00172 1.42702 5.94945 1.42702 7.11852C1.42702 8.2876 2.37474 9.23532 3.54382 9.23532Z" />
    </svg>
  );
};

/**
 * Skeleton Component for GraphQLEditor
 *
 * GraphQLEditor must be rendered client-side. During loading, this Skeleton is rendered.
 */
export const GraphQLSkeleton = () => {
  return (
    <div
      role="status"
      className="flex items-center justify-center w-full h-[600px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
    >
      <div className="w-[64px] aspect-square">
        <GraphQLIcon className="text-gray-200 dark:text-gray-600" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default GraphQLSkeleton;
