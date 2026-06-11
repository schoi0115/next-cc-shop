import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const body = await req.json();
  const filename = body.filename;

  if (!filename) {
    return NextResponse.json({ error: "filename 없음" });
  }

  // 1) 이미지 파일 삭제
  const imagePath = path.join(process.cwd(), "public", filename.replace("/", "\\"));
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  // 2) products.json에서 삭제
  const dataDir = path.join(process.cwd(), "data");
  const dbPath = path.join(dataDir, "products.json");

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, "[]");
  }

  let products = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  // 이미지 경로가 filename과 같은 상품 제거
  products = products.filter((p) => p.image !== filename);

  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));

  // 3) featured.json에서도 삭제
  const featuredPath = path.join(process.cwd(), "public", "featured.json");

  if (fs.existsSync(featuredPath)) {
    let featured = JSON.parse(fs.readFileSync(featuredPath, "utf8"));
    featured = featured.filter((img) => img !== filename);
    fs.writeFileSync(featuredPath, JSON.stringify(featured, null, 2));
  }

  return NextResponse.json({ message: "삭제 완료" });
}
