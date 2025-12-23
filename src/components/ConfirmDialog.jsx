import React from "react";
import theme from "../styles/theme";

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = "確認", cancelText = "取消" }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()} className="scale-in">
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <button onClick={onCancel} style={styles.cancelButton}>
            {cancelText}
          </button>
          <button onClick={onConfirm} style={styles.confirmButton}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.overlay,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10002,
    animation: "fadeIn 0.2s ease-out",
  },
  dialog: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    maxWidth: "400px",
    width: "90%",
    boxShadow: theme.shadows["2xl"],
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    marginTop: 0,
  },
  message: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing.xl,
  },
  actions: {
    display: "flex",
    gap: theme.spacing.md,
    justifyContent: "flex-end",
  },
  cancelButton: {
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.neutral.gray200,
    color: theme.colors.text.primary,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  confirmButton: {
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.primary.main,
    color: theme.colors.text.inverse,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: theme.shadows.md,
  },
};

export default ConfirmDialog;

