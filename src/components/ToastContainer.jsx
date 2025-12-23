import React from "react";
import Toast from "./Toast";
import theme from "../styles/theme";

function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 10000,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
    maxWidth: "500px",
  },
};

export default ToastContainer;

