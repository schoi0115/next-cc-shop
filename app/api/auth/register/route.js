import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";

export async function POST(req) {
  const { email, password, role } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  users.push({ email, password: hashed, role });

  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  return NextResponse.json({ message: "회원가입 완료" });
}
