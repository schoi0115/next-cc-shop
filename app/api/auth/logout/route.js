import { NextResponse } from "next/server";

export async function POST(req) {
  const url = new URL("/", req.url); // 절대 URL 생성

  const res = NextResponse.redirect(url);

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(0),
  });

  return res;
}
