import React, { useState, useMemo } from "react";
import theme from "../styles/theme";
import { useToastContext } from "../contexts/ToastContext";
import Tooltip from "../components/Tooltip";
import SearchBar from "../components/SearchBar";

const allTeachers = [
  {
    name: "Sarah Johnson",
    subject: "會話英語",
    experience: "10 年教學經驗",
    rating: 4.9,
    students: 250,
    avatar: "👩‍🏫",
    color: theme.colors.primary.main,
  },
  {
    name: "Michael Chen",
    subject: "商務英語",
    experience: "8 年教學經驗",
    rating: 4.8,
    students: 180,
    avatar: "👨‍🏫",
    color: theme.colors.secondary.main,
  },
  {
    name: "Emily Davis",
    subject: "學術英語",
    experience: "12 年教學經驗",
    rating: 5.0,
    students: 320,
    avatar: "👩‍🏫",
    color: theme.colors.success.main,
  },
];

function Teachers() {
  const toast = useToastContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = useMemo(() => {
    if (!searchTerm) return allTeachers;
    return allTeachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>教師資訊</h1>
        <p style={styles.subtitle}>認識我們的專業教師團隊</p>
        <div style={styles.searchContainer}>
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="搜尋教師姓名或科目..."
          />
        </div>
      </div>

      {filteredTeachers.length === 0 ? (
        <div style={styles.noResults}>
          <p>找不到符合「{searchTerm}」的教師</p>
        </div>
      ) : (
        <div style={styles.teachersGrid}>
          {filteredTeachers.map((teacher, index) => (
            <div
              key={index}
              style={{
                ...styles.teacherCard,
                animationDelay: `${index * 0.1}s`,
              }}
              className="hover-lift"
            >
              <div
                style={{
                  ...styles.avatarContainer,
                  backgroundColor: `${teacher.color}15`,
                }}
              >
                <div style={styles.avatar}>{teacher.avatar}</div>
              </div>
              <div style={styles.teacherInfo}>
                <h3 style={styles.teacherName}>{teacher.name}</h3>
                <p style={styles.teacherSubject}>{teacher.subject}</p>
                <div style={styles.teacherDetails}>
                  <span style={styles.detailItem}>
                    <span style={styles.detailIcon}>⭐</span>
                    {teacher.rating}
                  </span>
                  <span style={styles.detailItem}>
                    <span style={styles.detailIcon}>👥</span>
                    {teacher.students} 學員
                  </span>
                </div>
                <p style={styles.experience}>{teacher.experience}</p>
                <Tooltip text={`聯絡 ${teacher.name} 教師`}>
                  <button
                    style={{
                      ...styles.contactButton,
                      borderColor: teacher.color,
                      color: teacher.color,
                    }}
                    onClick={() => {
                      toast.info(`正在為您連線 ${teacher.name} 教師...`);
                    }}
                    className="hover-lift"
                  >
                    聯絡教師
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
  teachersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: theme.spacing.lg,
    maxWidth: "1280px",
    margin: "0 auto",
  },
  teacherCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.xl,
    textAlign: "center",
    transition: "all 0.3s ease",
    animation: "fadeIn 0.5s ease-out both",
  },
  avatarContainer: {
    width: "100px",
    height: "100px",
    borderRadius: theme.borderRadius.full,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  avatar: {
    fontSize: "48px",
  },
  teacherInfo: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.sm,
  },
  teacherName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    margin: 0,
  },
  teacherSubject: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    margin: 0,
  },
  teacherDetails: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing.lg,
    marginTop: theme.spacing.sm,
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  detailIcon: {
    fontSize: theme.typography.fontSize.base,
  },
  experience: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.sm,
  },
  contactButton: {
    marginTop: theme.spacing.md,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: "transparent",
    border: `2px solid`,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default Teachers;
