function LoadingSpinner() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "6px solid #e5e7eb",
          borderTop: "6px solid #ff8c66",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
}

export default LoadingSpinner;