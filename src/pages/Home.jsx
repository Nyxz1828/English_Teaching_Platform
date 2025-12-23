import React from "react";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";
import { useToastContext } from "../contexts/ToastContext";
import Tooltip from "../components/Tooltip";

function Home() {
  const navigate = useNavigate();
  const toast = useToastContext();
  const features = [
    {
      icon: "📖",
      title: "豐富課程內容",
      description: "提供多樣化的英語學習課程，從基礎到進階，滿足不同學習需求。",
      color: theme.colors.primary.main,
    },
    {
      icon: "👨‍🏫",
      title: "專業教師團隊",
      description: "經驗豐富的教師團隊，提供個人化指導和學習建議。",
      color: theme.colors.secondary.main,
    },
    {
      icon: "📊",
      title: "學習進度追蹤",
      description: "即時追蹤學習進度，了解自己的學習狀況和成長。",
      color: theme.colors.success.main,
    },
    {
      icon: "💼",
      title: "檔案管理",
      description: "方便管理學習檔案，隨時查看和編輯您的學習資料。",
      color: theme.colors.warning.main,
    },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            歡迎來到
            <span style={styles.heroTitleAccent}> 英語教學平台</span>
          </h1>
          <p style={styles.heroSubtitle}>
            English Teaching Platform
          </p>
          <p style={styles.heroDescription}>
            這是一個功能完整的英語教學平台，提供多種學習資源和工具，
            幫助您提升英語能力，實現學習目標。
          </p>
          <div style={styles.heroButtons}>
            <Tooltip text="開始您的英語學習之旅">
              <button
                style={styles.primaryButton}
                onClick={() => {
                  navigate("/lesson");
                  toast.info("歡迎來到課程頁面！");
                }}
                className="hover-lift"
              >
                開始學習
              </button>
            </Tooltip>
            <Tooltip text="了解更多關於平台的資訊">
              <button
                style={styles.secondaryButton}
                onClick={() => {
                  toast.info("更多資訊即將推出！");
                }}
                className="hover-lift"
              >
                了解更多
              </button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>平台特色</h2>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                ...styles.featureCard,
                animationDelay: `${index * 0.1}s`,
              }}
              className="hover-lift"
              onClick={() => {
                if (index === 0) navigate("/lesson");
                else if (index === 1) navigate("/teachers");
                else if (index === 2) navigate("/profile");
                else if (index === 3) navigate("/file-content");
              }}
            >
              <div
                style={{
                  ...styles.featureIcon,
                  backgroundColor: `${feature.color}15`,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: theme.colors.background.default,
  },
  hero: {
    background: `linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.secondary.main} 100%)`,
    padding: `${theme.spacing["3xl"]} ${theme.spacing.lg}`,
    color: theme.colors.text.inverse,
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  heroTitle: {
    fontSize: theme.typography.fontSize["5xl"],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
    lineHeight: theme.typography.lineHeight.tight,
    animation: "fadeIn 0.6s ease-out",
  },
  heroTitleAccent: {
    display: "block",
    background: "linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: theme.typography.fontSize["2xl"],
    marginBottom: theme.spacing.lg,
    opacity: 0.9,
    animation: "fadeIn 0.6s ease-out 0.2s both",
  },
  heroDescription: {
    fontSize: theme.typography.fontSize.lg,
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing.xl,
    opacity: 0.95,
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    animation: "fadeIn 0.6s ease-out 0.4s both",
  },
  heroButtons: {
    display: "flex",
    gap: theme.spacing.md,
    justifyContent: "center",
    animation: "fadeIn 0.6s ease-out 0.6s both",
  },
  primaryButton: {
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.background.paper,
    color: theme.colors.primary.main,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.lg,
  },
  secondaryButton: {
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: "transparent",
    color: theme.colors.background.paper,
    border: `2px solid ${theme.colors.background.paper}`,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  featuresSection: {
    padding: `${theme.spacing["3xl"]} ${theme.spacing.lg}`,
    maxWidth: "1280px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize["4xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing["2xl"],
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: theme.spacing.lg,
  },
  featureCard: {
    backgroundColor: theme.colors.background.paper,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    textAlign: "center",
    transition: "all 0.3s ease",
    animation: "fadeIn 0.5s ease-out both",
  },
  featureIcon: {
    fontSize: "48px",
    width: "80px",
    height: "80px",
    borderRadius: theme.borderRadius.full,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: `0 auto ${theme.spacing.md}`,
    transition: "transform 0.3s ease",
  },
  featureTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  featureDescription: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
  },
};

export default Home;
