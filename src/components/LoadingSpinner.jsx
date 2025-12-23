import React from "react";
import theme from "../styles/theme";

function LoadingSpinner({ size = "md", text = "" }) {
  const sizeMap = {
    sm: "20px",
    md: "40px",
    lg: "60px",
  };

  const borderSizeMap = {
    sm: "2px",
    md: "4px",
    lg: "6px",
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.spinner,
          width: sizeMap[size],
          height: sizeMap[size],
          borderWidth: borderSizeMap[size],
        }}
      />
      {text && <p style={styles.text}>{text}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
  },
  spinner: {
    border: `4px solid ${theme.colors.neutral.gray200}`,
    borderTop: `4px solid ${theme.colors.primary.main}`,
    borderRadius: theme.borderRadius.full,
    animation: "spin 1s linear infinite",
  },
  text: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    margin: 0,
  },
};

// 添加旋轉動畫（如果還沒有）
if (!document.getElementById("spinner-animation")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "spinner-animation";
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default LoadingSpinner;

