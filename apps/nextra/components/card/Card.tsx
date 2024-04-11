import { Link } from "nextra-theme-docs";

export const Title = ({ children, ...props }) => (
  <h2 className="font-semibold items-start gap-2" {...props}>
    {children}
  </h2>
);

export const Description = ({ children, ...props }) => (
  <span className="card-description" {...props}>
    {children}
  </span>
);

export interface CardProps {
  children: React.ReactElement;
  href?: string;
}

export function Card({ children, href }: CardProps) {
  return (
    <Link
      href={href}
      className="
        flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 
        text-current no-underline dark:shadow-none hover:shadow-gray-100 dark:hover:shadow-none 
        shadow-gray-100 active:shadow-sm active:shadow-gray-200 transition-all duration-200 
        hover:border-gray-300 bg-transparent shadow-sm dark:border-neutral-800 
        hover:bg-slate-50 hover:shadow-md dark:hover:border-neutral-700 dark:hover:bg-neutral-900
        p-4 text-gray-700 hover:text-gray-900
        dark:text-neutral-200 dark:hover:text-neutral-50
        gap-2
      "
      style={{ cursor: href ? "pointer" : undefined }}
    >
      {children}
    </Link>
  );
}

export interface CardsProps {
  children: React.ReactElement;
}

export function Cards({ children }: CardsProps) {
  return (
    <div className="cards mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

Card.Title = Title;
Card.Description = Description;

export default Card;
