import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log('psaddddddddddddddddjqwjdriwijq');
    console.log(request.nextauth.token);
    if (
      request.nextUrl.pathname.startsWith('/api/admin') &&
      request.nextauth.token?.role !== 'admin'
    ) {
      return NextResponse.rewrite(new URL('denied', request.url));

      //rewrite means redirect to the url but the url shown will still be the same before
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log(token);
        return !!token; //have to be boolean
        //the function middleware above will run only if the authorized function return true
        // it if is false, will be redirected to the page in the pages object
      },
    },
  }
);

export const config = { matcher: ['/api/user', '/api/admin'] };
//authorization is done in the middleware
