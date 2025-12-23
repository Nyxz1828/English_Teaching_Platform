import React, { useState, useMemo } from "react";
import theme from "../styles/theme";
import { useToastContext } from "../contexts/ToastContext";
import Tooltip from "../components/Tooltip";
import SearchBar from "../components/SearchBar";

const allLessons = [
  {
    title: "基礎英語會話",
    level: "初級",
    duration: "4 週",
    students: 120,
    color: theme.colors.primary.main,
  },
  {
    title: "商務英語寫作",
    level: "中級",
    duration: "6 週",
    students: 85,
    color: theme.colors.secondary.main,
  },
  {
    title: "學術英語閱讀",
    level: "高級",
    duration: "8 週",
    students: 45,
    color: theme.colors.success.main,
  },
];

function Lesson() {
  const toast = useToastContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLessons = useMemo(() => {
    if (!searchTerm) return allLessons;
    return allLessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.level.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>課程內容</h1>
        <p style={styles.subtitle}>探索我們的豐富課程</p>
        <div style={styles.searchContainer}>
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="搜尋課程名稱或等級..."
          />
        </div>
      </div>

      {filteredLessons.length === 0 ? (
        <div style={styles.noResults}>
          <p>找不到符合「{searchTerm}」的課程</p>
        </div>
      ) : (
        <div style={styles.lessonsGrid}>
          {filteredLessons.map((lesson, index) => (
            <div
              key={index}
              style={{
                ...styles.lessonCard,
                animationDelay: `${index * 0.1}s`,
              }}
              className="hover-lift"
            >
              <div
                style={{
                  ...styles.lessonHeader,
                  backgroundColor: `${lesson.color}15`,
                }}
              >
                <h3 style={styles.lessonTitle}>{lesson.title}</h3>
                <span
                  style={{
                    ...styles.levelBadge,
                    backgroundColor: lesson.color,
                  }}
                >
                  {lesson.level}
                </span>
              </div>
              <div style={styles.lessonBody}>
                <div style={styles.lessonInfo}>
                  <span style={styles.infoItem}>
                    <span style={styles.infoIcon}>⏱️</span>
                    課程時長：{lesson.duration}
                  </span>
                  <span style={styles.infoItem}>
                    <span style={styles.infoIcon}>👥</span>
                    學員數：{lesson.students}
                  </span>
                </div>
                <Tooltip text={`報名 ${lesson.title} 課程`}>
                  <button
                    style={{
                      ...styles.enrollButton,
                      backgroundColor: lesson.color,
                    }}
                    onClick={() => {
                      toast.success(`已成功報名「${lesson.title}」課程！`);
                    }}
                    className="hover-lift"
                  >
                    立即報名
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      )}
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
  header: {
    textAlign: "center",
    marginBottom: theme.spacing["3xl"],
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    fontSize: theme.typography.fontSize["4xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  searchContainer: {
    maxWidth: "500px",
    margin: "0 auto",
    marginTop: theme.spacing.lg,
  },
  noResults: {
    textAlign: "center",
    padding: theme.spacing["3xl"],
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.lg,
  },
  lessonsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: theme.spacing.lg,
    maxWidth: "1280px",
    margin: "0 auto",
  },
  lessonCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    overflow: "hidden",
    transition: "all 0.3s ease",
    animation: "fadeIn 0.5s ease-out both",
  },
  lessonHeader: {
    padding: theme.spacing.xl,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    margin: 0,
  },
  levelBadge: {
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.full,
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  lessonBody: {
    padding: theme.spacing.xl,
  },
  lessonInfo: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
  },
  infoIcon: {
    fontSize: theme.typography.fontSize.lg,
  },
  enrollButton: {
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colors.text.inverse,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.sm,
  },
};

export default Lesson;
