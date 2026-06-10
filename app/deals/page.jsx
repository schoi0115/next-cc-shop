export default function DealsPage() {
  return (
    <>
      <main style={{ padding: "40px" }}>
        <h1>오늘의 딜 🔥</h1>

        <div style={styles.grid}>
          <div style={styles.card}>50% 할인 상품</div>
          <div style={styles.card}>1+1 이벤트</div>
          <div style={styles.card}>특가 상품</div>
        </div>
      </main>
    </>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#fff7e6",
  },
};
