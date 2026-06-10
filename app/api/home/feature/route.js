import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const { filename } = await req.json();

  const filePath = path.join(process.cwd(), "public", "featured.json");

  let featured = [];

  if (fs.existsSync(filePath)) {
    featured = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  // 중복 방지
  if (!featured.includes(filename)) {
    featured.push(filename);
  }

  fs.writeFileSync(filePath, JSON.stringify(featured, null, 2));

  return NextResponse.json({ message: "대표 상품으로 설정됨" });
}
