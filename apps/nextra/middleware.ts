import { NextResponse, NextRequest } from "next/server";

// Routes in this list will be redirected to a prefixed route
const NON_LOCALE_ROUTES = ["/network/faucet"];

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  if (!NON_LOCALE_ROUTES.includes(nextUrl.pathname)) {
    return;
  }

  // for now, the custom pages are only available in en, no need to determine a locale
  return NextResponse.redirect(
    new URL(`/en${nextUrl.pathname}${nextUrl.search}`, request.url),
  );
}
