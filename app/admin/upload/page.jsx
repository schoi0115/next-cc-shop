"use client";

import { useState } from "react";

export default function UploadPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Men");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);

  const colorOptions = ["Black", "White", "Gray", "Blue", "Red", "Green"];
  const sizeOptions = ["S", "M", "L", "XL", "Free"];

  const toggleColor = (color) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("colors", JSON.stringify(colors));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("description", description);
    formData.append("status", status);
    formData.append("tags", tags);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const res = await fetch("/api/products/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("상품이 업로드되었습니다!");
    } else {
      alert("업로드 실패");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">상품 업로드</h2>

      {/* 상품 이름 */}
      <label>상품 이름</label>
      <input
        className="border p-2 w-full mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* 카테고리 */}
      <label>카테고리</label>
      <select
        className="border p-2 w-full mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Men">Men</option>
        <option value="Women">Women</option>
      </select>

      {/* 수량 */}
      <label>수량</label>
      <input
        type="number"
        className="border p-2 w-full mb-3"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      {/* 가격 */}
      <label>가격</label>
      <input
        type="number"
        className="border p-2 w-full mb-3"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* 색상 */}
      <label>색상 (여러 개 선택 가능)</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {colorOptions.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => toggleColor(color)}
            className={`px-3 py-1 border rounded ${
              colors.includes(color) ? "bg-black text-white" : ""
            }`}
          >
            {color}
          </button>
        ))}
      </div>

      {/* 사이즈 */}
      <label>사이즈 (여러 개 선택 가능)</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {sizeOptions.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => toggleSize(size)}
            className={`px-3 py-1 border rounded ${
              sizes.includes(size) ? "bg-black text-white" : ""
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* 설명 */}
      <label>상품 설명</label>
      <textarea
        className="border p-2 w-full mb-3"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* 상태 */}
      <label>상품 상태</label>
      <select
        className="border p-2 w-full mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="active">판매중</option>
        <option value="hidden">숨김</option>
      </select>

      {/* 태그 */}
      <label>태그 (쉼표로 구분)</label>
      <input
        className="border p-2 w-full mb-3"
        placeholder="예: 후드티, 오버핏, 겨울"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* 이미지 */}
      <label>상품 이미지</label>
      <input
        type="file"
        multiple
        className="border p-2 w-full mb-3"
        onChange={(e) => setImages(e.target.files)}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        업로드
      </button>
    </div>
  );
}
