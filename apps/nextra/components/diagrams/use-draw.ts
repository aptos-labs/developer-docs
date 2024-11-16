import { useRouter } from "nextra/hooks";

export function useDraw(paths = {}, name = "") {
  const { locale, defaultLocale } = useRouter() as {
    locale: string;
    defaultLocale: string;
  };

  if (!Object.prototype.hasOwnProperty.call(paths, defaultLocale)) {
    throw new Error(
      `Please provide '${defaultLocale}' locale inside '${paths}'.`,
    );
  }

  if (
    typeof paths[locale] === "string" &&
    typeof paths[defaultLocale] === "string"
  ) {
    return paths[locale] || paths[defaultLocale];
  }

  return paths[locale]?.[name] || paths[defaultLocale][name];
}
