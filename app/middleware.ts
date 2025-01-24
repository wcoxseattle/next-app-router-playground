import { NextRequest, NextResponse } from 'next/server';

const SRC_BASE_URL = '/api/';
const DEST_BASE_URL = 'http://localhost:5037/api/';

// Nextjs has very limited configurability options for this object, do not change this for now.
export const config = {
  matcher: ['/api/:path*'],
};

function rewriteUrl(refUrl: URL, oldPrefix: string, newPrefix: string): URL {
  const pathName = refUrl.pathname.replace(oldPrefix, newPrefix);

  return new URL(`${pathName}${refUrl.search}`);
}

export async function middleware(request: NextRequest) {
  const refUrl = request.nextUrl;
  const destUrl = rewriteUrl(refUrl, SRC_BASE_URL, DEST_BASE_URL);

  const response = NextResponse.rewrite(destUrl, { request: request });

  return response;
}
