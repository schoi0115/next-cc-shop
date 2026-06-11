import fs from "fs";
import path from "path";

export default function HomePage() {
  const filePath = path.join(process.cwd(), "./public/featured.json");
  let featured = [];

  if (fs.existsSync(filePath)) {
    featured = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>대표 상품</h1>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "20px" }}>
        {featured.map((img) => (
          <img
            key={img}
            src={img}
            alt={img}
            style={{
              width: "600px",
              height: "600px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        ))}
      </div>
    </main>
  );
}
