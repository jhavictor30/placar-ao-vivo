export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "2.5rem", color: "#1e3a8a" }}>
        🏆 Placar ao Vivo
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#333", marginTop: "10px" }}>
        O site está online! 🚀
      </p>
    </div>
  );
}
