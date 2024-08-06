import Link from "next/link";

export interface LocaleErrorProps {
  redirectUrl: string;
}

export default function LocaleError({ redirectUrl }: LocaleErrorProps) {
  return (
    <div>
      <h1>We do not have the translated version of those docs at the moment</h1>
      <Link
        href={redirectUrl}
        className="border-gray-200 border-[1px] text-[14px] hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        ← Go back to English docs
      </Link>
    </div>
  );
}
