import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const form = await req.formData();

  const name = form.get("name");
  const category = form.get("category");
  const quantity = form.get("quantity");
  const price = form.get("price");
  const colors = JSON.parse(form.get("colors"));
  const sizes = JSON.parse(form.get("sizes"));
  const description = form.get("description");
  const status = form.get("status");
  const tags = form.get("tags")?.split(",").map(t => t.trim()) || [];

  const images = form.getAll("images"); // 여러 이미지

  if (!name || images.length === 0) {
    return NextResponse.json({ error: "상품 이름 또는 이미지가 없습니다." });
  }

  // 이미지 저장 폴더
  const uploadDir = path.join(process.cwd(), "public/images/products");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // 이미지 저장 후 경로 배열 만들기
  const imagePaths = [];

  for (const file of images) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, buffer);

    imagePaths.push(`/images/products/${file.name}`);
  }

  // data 폴더 생성
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  const dbPath = path.join(dataDir, "products.json");
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, "[]");

  let products = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  // 새 상품 데이터
  const newProduct = {
    id: Date.now(),
    name,
    category,
    quantity: Number(quantity),
    price: Number(price),
    colors,
    sizes,
    description,
    status,
    tags,
    images: imagePaths,
    created_at: new Date().toISOString(),
  };

  products.push(newProduct);

  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));

  return NextResponse.json({ success: true, product: newProduct });
}
