import React, { useEffect } from "react";
import theme from "../styles/theme";

function Toast({ message, type = "info", onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getTypeStyles = () => {
    const typeMap = {
      success: {
        backgroundColor: theme.colors.success.main,
        icon: "✅",
      },
      error: {
        backgroundColor: theme.colors.error.main,
        icon: "❌",
      },
      warning: {
        backgroundColor: theme.colors.warning.main,
        icon: "⚠️",
      },
      info: {
        backgroundColor: theme.colors.primary.main,
        icon: "ℹ️",
      },
    };
    return typeMap[type] || typeMap.info;
  };

  const typeStyles = getTypeStyles();

  return (
    <div
      style={{
        ...styles.toast,
        backgroundColor: typeStyles.backgroundColor,
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <span style={styles.icon}>{typeStyles.icon}</span>
      <span style={styles.message}>{message}</span>
      <button onClick={onClose} style={styles.closeButton}>
        ✕
      </button>
    </div>
  );
}

const styles = {
  toast: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.md,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.xl,
    color: theme.colors.text.inverse,
    minWidth: "300px",
    maxWidth: "500px",
    position: "relative",
    zIndex: 10000,
  },
  icon: {
    fontSize: theme.typography.fontSize.xl,
  },
  message: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
  },
  closeButton: {
    background: "transparent",
    border: "none",
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.lg,
    cursor: "pointer",
    padding: theme.spacing.xs,
    lineHeight: 1,
    opacity: 0.8,
    transition: "opacity 0.2s ease",
  },
};

export default Toast;

