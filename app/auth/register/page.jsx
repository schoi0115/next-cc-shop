"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // 기본값: 고객

  const register = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert("회원가입 완료");
      window.location.href = "/auth/login";
    }
  };

  return (
    <main style={styles.container}>
      <h1>회원가입</h1>

      <div style={styles.form}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="user">일반 고객</option>
          <option value="admin">관리자</option>
        </select>

        <button onClick={register} style={styles.button}>
          회원가입
        </button>

        <p style={{ marginTop: "10px" }}>
          이미 계정이 있나요? <a href="/auth/login">로그인</a>
        </p>
      </div>
    </main>
  );
}

const styles = {
  container: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "350px",
    marginTop: "20px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
