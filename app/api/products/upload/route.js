import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");

  if (!file) {
    return NextResponse.json({ error: "파일이 없습니다" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 저장 경로
  const uploadDir = path.join(process.cwd(), "public/images/products");

  // 폴더 없으면 생성
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, file.name);

  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ message: "업로드 성공", file: `/images/products/${file.name}` });
}
