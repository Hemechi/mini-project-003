import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	console.log("========| Middleware Running |========");
	console.log("=> Request URL: ", request.url);
	console.log("=> Request Method: ", request.method);
	// console.log("=> Request Headers: ", request.headers)
	const cookies = request.cookies;
	// console.log("=> Request Cookies: ", cookies)
	let session = cookies.get("authjs.session-token");
	console.log("=> Session: ", session);

	const refreshToken = cookies.get("istad-refresh-token");

	if (!session) {
		return NextResponse.redirect(new URL("/auth/login", request.url).toString());
	}

	if(session === undefined){
		session = refreshToken;
	}

}

// multiple middleware
export const config = {
	matcher: ["/cart"],
};
