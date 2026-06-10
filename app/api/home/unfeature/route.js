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

  featured = featured.filter((item) => item !== filename);

  fs.writeFileSync(filePath, JSON.stringify(featured, null, 2));

  return NextResponse.json({ message: "대표 상품 취소됨" });
}
