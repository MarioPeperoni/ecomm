import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Extract and modify the hostname
  let hostname = req.headers
    .get('host')!
    .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Check and modify hostname for deployments with '---'
  if (
    hostname.includes('---') &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split('---')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  // Construct the path with search params
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams ? `?${searchParams}` : ''}`;

  // Rewrite rule for main app domain
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    const rewrittenURL = new URL(`/app${path === '/' ? '' : path}`, req.url);
    return NextResponse.rewrite(rewrittenURL);
  }

  // Rewrite root application to `/home` folder
  if (hostname === 'localhost:3000' || hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    const rewrittenURL = new URL(`/home${path === '/' ? '' : path}`, req.url);
    return NextResponse.rewrite(rewrittenURL);
  }

  // Rewrite to specific subdomain folder
  const rewrittenURL = new URL(`/${hostname}${path}`, req.url);
  return NextResponse.rewrite(rewrittenURL);
}
