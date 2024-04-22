import { NextRequest, NextResponse } from "next/server";
import ISO6391 from "iso-639-1";

const PUBLIC_FILE = /\.(.*)$/;

const LOCALES = ["en"];

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    console.log(`skip ${req.nextUrl}`);
    return;
  }
  console.log(req.nextUrl);

  // Determine language
  let code = ISO6391.getAllCodes().find((locale) => {
    if (req.nextUrl.pathname.startsWith(`/${locale}`)) {
      return locale;
    }

    return undefined;
  });

  // If there is a language code, we determine if it's supported
  if (code && LOCALES.some((locale) => locale === code)) {
    // Supported locales should be passed normally
    console.log(`Supported ${code}`);
    return;
  } else if (code) {
    // If the language is unsupported
    // Strip the unsupported language
    req.nextUrl.pathname = req.nextUrl.pathname.substring(1 + code.length);

    console.log(`Unsupported ${code}`);
    return NextResponse.redirect(
      new URL(`/en${req.nextUrl.pathname}`, req.url),
    );
  } else {
    console.log(`Default to en`);
    // Otherwise, redirect to en
    // TODO: Currently there's some hydration issue which prevents using the
    // '/' path instead of 'en'
    return NextResponse.redirect(
      new URL(`/en${req.nextUrl.pathname}`, req.url),
    );
  }
}
