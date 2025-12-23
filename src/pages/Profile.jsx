import React from "react";
import theme from "../styles/theme";

function Profile() {
  const stats = [
    { label: "已完成課程", value: "12", icon: "✅", color: theme.colors.success.main },
    { label: "進行中課程", value: "3", icon: "📚", color: theme.colors.primary.main },
    { label: "學習時數", value: "156", icon: "⏰", color: theme.colors.secondary.main },
    { label: "成就徽章", value: "8", icon: "🏆", color: theme.colors.warning.main },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>👤</div>
          <h1 style={styles.userName}>使用者名稱</h1>
          <p style={styles.userEmail}>user@example.com</p>
        </div>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              ...styles.statCard,
              animationDelay: `${index * 0.1}s`,
            }}
            className="hover-lift"
          >
            <div
              style={{
                ...styles.statIcon,
                backgroundColor: `${stat.color}15`,
                color: stat.color,
              }}
            >
              {stat.icon}
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.contentSection}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>學習進度</h2>
          <div style={styles.progressCard}>
            <div style={styles.progressItem}>
              <div style={styles.progressHeader}>
                <span style={styles.progressLabel}>基礎英語會話</span>
                <span style={styles.progressPercent}>75%</span>
              </div>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: "75%",
                    backgroundColor: theme.colors.primary.main,
                  }}
                />
              </div>
            </div>
            <div style={styles.progressItem}>
              <div style={styles.progressHeader}>
                <span style={styles.progressLabel}>商務英語寫作</span>
                <span style={styles.progressPercent}>45%</span>
              </div>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: "45%",
                    backgroundColor: theme.colors.secondary.main,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>個人資料</h2>
          <div style={styles.infoCard}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>加入日期</span>
              <span style={styles.infoValue}>2024年1月</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>學習目標</span>
              <span style={styles.infoValue}>提升商務英語能力</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>偏好學習時間</span>
              <span style={styles.infoValue}>晚上 7-9 點</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing.xl,
    animation: "fadeIn 0.5s ease-out",
  },
  profileHeader: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    padding: theme.spacing["2xl"],
    marginBottom: theme.spacing.xl,
    textAlign: "center",
  },
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.primary.main}15`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "64px",
  },
  userName: {
    fontSize: theme.typography.fontSize["3xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    margin: 0,
  },
  userEmail: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    margin: 0,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.xl,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.md,
    transition: "all 0.3s ease",
    animation: "fadeIn 0.5s ease-out both",
  },
  statIcon: {
    width: "56px",
    height: "56px",
    borderRadius: theme.borderRadius.lg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: theme.typography.fontSize["2xl"],
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  contentSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: theme.spacing.xl,
    maxWidth: "1280px",
    margin: "0 auto",
  },
  section: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    marginTop: 0,
  },
  progressCard: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.lg,
  },
  progressItem: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.sm,
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  progressPercent: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: theme.colors.neutral.gray200,
    borderRadius: theme.borderRadius.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: theme.borderRadius.full,
    transition: "width 0.5s ease",
  },
  infoCard: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.neutral.gray200}`,
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
};

export default Profile;
