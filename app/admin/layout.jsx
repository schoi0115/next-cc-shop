import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div>
      {/* 관리자 네비게이션 */}
      <nav style={styles.nav}>
        <Link href="/admin" style={styles.link}>관리자 페이지</Link>
        <Link href="/admin/upload" style={styles.link}>상품 이미지 업로드</Link>
        <Link href="/admin/products" style={styles.link}>상품 관리</Link>
      </nav>

      {/* 실제 페이지 내용 */}
      <div style={{ padding: "30px" }}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    borderBottom: "1px solid #b85050",
    backgroundColor: "#fc7f7f",
  },
  link: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};
