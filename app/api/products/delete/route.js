import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const { filename } = await req.json();

  const filePath = path.join(process.cwd(), "public/images/products", filename);

  // 파일 삭제
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // featured.json에서도 제거
  const featuredPath = path.join(process.cwd(), "featured.json");
  if (fs.existsSync(featuredPath)) {
    let featured = JSON.parse(fs.readFileSync(featuredPath, "utf8"));
    featured = featured.filter((item) => item !== filename);
    fs.writeFileSync(featuredPath, JSON.stringify(featured, null, 2));
  }

  return NextResponse.json({ message: "상품 삭제 완료" });
}
