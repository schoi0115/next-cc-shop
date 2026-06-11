import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const body = await req.json();
  const filename = body.filename; // "/images/products/a.jpg"

  const filePath = path.join(process.cwd(), "public", "featured.json");

  // 파일 없으면 생성
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  let featured = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // 중복 방지
  if (!featured.includes(filename)) {
    featured.push(filename);
  }

  fs.writeFileSync(filePath, JSON.stringify(featured, null, 2));

  return NextResponse.json({ message: "대표 설정 완료" });
}
