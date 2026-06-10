import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

export async function POST(req) {
  const { email, password } = await req.json();

  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));
  const user = users.find((u) => u.email === email);

  if (!user) return NextResponse.json({ error: "존재하지 않는 계정" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return NextResponse.json({ error: "비밀번호 불일치" });

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const res = NextResponse.json({ message: "로그인 성공" });
  res.cookies.set("token", token, { httpOnly: true });

  return res;
}
