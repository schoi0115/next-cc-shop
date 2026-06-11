// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export async function GET() {
//   const mainDir = path.join(process.cwd(), "public/images");
//   const productsDir = path.join(process.cwd(), "public/images/products");

//   let mainFiles = [];
//   let productFiles = [];

//   // /public/images 안의 파일들 (product1.jpg 등)
//   if (fs.existsSync(mainDir)) {
//     mainFiles = fs
//       .readdirSync(mainDir)
//       .filter((file) => file !== "products"); // products 폴더 제외
//   }

//   // /public/images/products 안의 파일들 (관리자 업로드)
//   if (fs.existsSync(productsDir)) {
//     productFiles = fs.readdirSync(productsDir).map((file) => `products/${file}`);
//   }

//   // 두 폴더의 파일을 합치기
//   const allFiles = [...mainFiles, ...productFiles];

//   return NextResponse.json({ files: allFiles });
// }
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category"); // men / women / null

  const dbPath = path.join(process.cwd(), "data/products.json");

  if (!fs.existsSync(dbPath)) {
    return NextResponse.json([]);
  }

  const products = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  if (!category) return NextResponse.json(products);

  const filtered = products.filter((p) => p.category === category);

  return NextResponse.json(filtered);
}
