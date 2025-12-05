import React from "react";

function MyComponents() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>English Teaching Platform</h1>
      <p style={styles.subtitle}>Welcome! This is your first custom component.</p>

      <button style={styles.button}>
        Click Me
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4A90E2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  }
};

export default MyComponents;
