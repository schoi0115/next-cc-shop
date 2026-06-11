import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const body = await req.json();
  const filename = body.filename;

  const filePath = path.join(process.cwd(), "public", "featured.json");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  let featured = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // 해당 이미지 제거
  featured = featured.filter((img) => img !== filename);

  fs.writeFileSync(filePath, JSON.stringify(featured, null, 2));

  return NextResponse.json({ message: "대표 취소 완료" });
}
