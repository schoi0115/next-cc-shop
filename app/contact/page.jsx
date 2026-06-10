export default function ContactPage() {
  return (
    <>
      <main style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
        <h1>이용 문의</h1>

        <form style={styles.form}>
          <input type="text" placeholder="이름" style={styles.input} />
          <input type="email" placeholder="이메일" style={styles.input} />
          <textarea placeholder="문의 내용" style={styles.textarea}></textarea>
          <button style={styles.button}>문의 보내기</button>
        </form>
      </main>
    </>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "12px",
    height: "120px",
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
