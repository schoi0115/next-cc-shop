import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const mainDir = path.join(process.cwd(), "public/images");
  const productsDir = path.join(process.cwd(), "public/images/products");

  let mainFiles = [];
  let productFiles = [];

  // /public/images 안의 파일들 (product1.jpg 등)
  if (fs.existsSync(mainDir)) {
    mainFiles = fs
      .readdirSync(mainDir)
      .filter((file) => file !== "products"); // products 폴더 제외
  }

  // /public/images/products 안의 파일들 (관리자 업로드)
  if (fs.existsSync(productsDir)) {
    productFiles = fs.readdirSync(productsDir).map((file) => `products/${file}`);
  }

  // 두 폴더의 파일을 합치기
  const allFiles = [...mainFiles, ...productFiles];

  return NextResponse.json({ files: allFiles });
}
