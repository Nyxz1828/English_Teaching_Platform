// 統一的設計系統
export const theme = {
  colors: {
    primary: {
      main: "#6366F1", // Indigo
      light: "#818CF8",
      dark: "#4F46E5",
      hover: "#818CF8",
    },
    secondary: {
      main: "#8B5CF6", // Purple
      light: "#A78BFA",
      dark: "#7C3AED",
    },
    success: {
      main: "#10B981", // Green
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B", // Amber
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444", // Red
      light: "#F87171",
      dark: "#DC2626",
    },
    neutral: {
      white: "#FFFFFF",
      gray50: "#F9FAFB",
      gray100: "#F3F4F6",
      gray200: "#E5E7EB",
      gray300: "#D1D5DB",
      gray400: "#9CA3AF",
      gray500: "#6B7280",
      gray600: "#4B5563",
      gray700: "#374151",
      gray800: "#1F2937",
      gray900: "#111827",
      black: "#000000",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
      disabled: "#9CA3AF",
      inverse: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: {
      primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      mono: "'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px",
      "5xl": "48px",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },
  borderRadius: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  transitions: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    },
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

export default theme;

