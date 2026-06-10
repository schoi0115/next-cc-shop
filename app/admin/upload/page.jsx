"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const upload = async () => {
    if (!file) {
      alert("이미지를 선택하세요");
      return;
    }

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/products/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <main style={styles.container}>
      <h1>상품 이미지 업로드</h1>

      <div style={styles.box}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="미리보기"
            style={{ width: "300px", marginTop: "20px", borderRadius: "8px" }}
          />
        )}

        <button onClick={upload} style={styles.button}>
          업로드
        </button>
      </div>
    </main>
  );
}

const styles = {
  container: {
    padding: "40px",
  },
  box: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "400px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
