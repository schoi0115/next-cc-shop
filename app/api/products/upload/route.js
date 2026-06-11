import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");
  const category = form.get("category");
  const name = form.get("name");

  if (!file || !name) {
    return NextResponse.json({ error: "상품 이름 또는 파일이 없습니다." });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/images/products");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, file.name);
  fs.writeFileSync(filePath, buffer);

  // data 폴더 자동 생성
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  const dbPath = path.join(dataDir, "products.json");
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, "[]");

  let products = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  products.push({
    id: Date.now(),
    name,
    image: `/images/products/${file.name}`,
    category,
  });

  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));

  return NextResponse.json({ message: "업로드 성공" });
}
