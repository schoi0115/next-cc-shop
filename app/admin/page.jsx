export default function AdminPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>관리자 페이지</h1>

      <ul style={{ marginTop: "20px" }}>
        <li><a href="/admin/upload">상품 이미지 업로드</a></li>
        <li><a href="/admin/products">상품 관리</a></li>
      </ul>
    </main>
  );
}
