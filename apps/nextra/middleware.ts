import { NextRequest, NextResponse } from "next/server";
import ISO6391 from "iso-639-1";
import { i18nConfig } from "@docs-config";

const PUBLIC_FILE = /\.(.*)$/;

const EN_LOCALE = i18nConfig.en.locale;
const LOCALES = [EN_LOCALE];

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  // Determine language
  let code = ISO6391.getAllCodes().find((locale) => {
    if (req.nextUrl.pathname.startsWith(`/${locale}`)) {
      return locale;
    }

    return undefined;
  });

  // If there is a language code, we determine if it's supported
  if (code && LOCALES.includes(code)) {
    // Supported locales should be passed normally
    return;
  } else if (code) {
    // If the language is unsupported
    // Strip the unsupported language
    req.nextUrl.pathname = req.nextUrl.pathname.substring(1 + code.length);

    return NextResponse.redirect(
      new URL(`/${EN_LOCALE}${req.nextUrl.pathname}`, req.url),
    );
  } else {
    // Otherwise, redirect to default locale
    // TODO: Currently there's some hydration issue which prevents using the
    // '/' path instead of 'en'
    return NextResponse.redirect(
      new URL(`/${EN_LOCALE}${req.nextUrl.pathname}`, req.url),
    );
  }
}
