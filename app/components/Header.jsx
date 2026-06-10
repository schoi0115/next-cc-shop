import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function POST() {
  const res = NextResponse.json({ message: "로그아웃 완료" });
  res.cookies.set("token", "", { maxAge: 0 });
  return res;
}


export default function Header() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;

  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      user = null;
    }
  }

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/deals">Deals</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>

        {user?.role === "admin" && (
          <Link href="/admin" style={{ marginLeft: "20px", color: "red" }}>
            Admin
          </Link>
        )}
      </div>

      <div style={styles.right}>
        {!user && (
          <>
            <Link href="/auth/login">로그인</Link>
            <Link href="/auth/register" style={{ marginLeft: "15px" }}>
              회원가입
            </Link>
          </>
        )}

        {user && (
          <>
            <span style={{ marginRight: "15px" }}>
              {user.email} 님
            </span>
            <form action="/api/auth/logout" method="POST">
              <button style={styles.logoutBtn}>로그아웃</button>
            </form>
          </>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
  },
  left: {
    display: "flex",
    gap: "20px",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  logoutBtn: {
    background: "none",
    border: "none",
    color: "blue",
    cursor: "pointer",
  },
};
