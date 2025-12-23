import React from "react";
import { Link, useLocation } from "react-router-dom";
import theme from "../styles/theme";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {/* Logo / Title */}
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>📚</span>
            <span style={styles.logoText}>English Platform</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div style={styles.navLinks}>
          <NavLink to="/" isActive={isActive("/")} label="首頁" />
          <NavLink to="/lesson" isActive={isActive("/lesson")} label="課程" />
          <NavLink to="/teachers" isActive={isActive("/teachers")} label="教師" />
          <NavLink to="/profile" isActive={isActive("/profile")} label="個人資料" />
          <NavLink to="/file-content" isActive={isActive("/file-content")} label="檔案內容" />
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, isActive, label }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      to={to}
      style={{
        ...styles.link,
        ...(isActive ? styles.linkActive : {}),
        ...(isHovered && !isActive ? styles.linkHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
      {isActive && <span style={styles.activeIndicator} />}
    </Link>
  );
}

const styles = {
  header: {
    width: "100%",
    backgroundColor: theme.colors.background.paper,
    boxShadow: theme.shadows.md,
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: `1px solid ${theme.colors.neutral.gray200}`,
  },
  nav: {
    maxWidth: "1280px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
  },
  logoLink: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.main,
    transition: "all 0.3s ease",
  },
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    background: `linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.secondary.main} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  navLinks: {
    display: "flex",
    gap: theme.spacing.sm,
    alignItems: "center",
  },
  link: {
    position: "relative",
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.md,
    textDecoration: "none",
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  linkHover: {
    backgroundColor: `${theme.colors.primary.main}10`,
    color: theme.colors.primary.main,
  },
  linkActive: {
    color: theme.colors.primary.main,
    backgroundColor: `${theme.colors.primary.main}15`,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "4px",
    height: "4px",
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary.main,
  },
};
