import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { isAllowedRoute, routes } from "./routes";

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Create a mutable NextResponse for managing cookies
  let supabaseResponse = NextResponse.next({
    request: req,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { pathname } = req.nextUrl;

  if (!isAllowedRoute(pathname)) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = routes.public.login;
      return NextResponse.redirect(loginUrl);
    }
  }

  // Hostname handling logic
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;

  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    const rewrittenURL = new URL(`/app${path === "/" ? "" : path}`, req.url);
    supabaseResponse = NextResponse.rewrite(rewrittenURL);
  } else if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    const rewrittenURL = new URL(`/home${path === "/" ? "" : path}`, req.url);
    supabaseResponse = NextResponse.rewrite(rewrittenURL);
  } else {
    const rewrittenURL = new URL(`/${hostname}${path}`, req.url);
    supabaseResponse = NextResponse.rewrite(rewrittenURL);
  }

  return supabaseResponse;
}
