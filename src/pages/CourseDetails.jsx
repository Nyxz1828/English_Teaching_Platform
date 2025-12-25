import React from "react";
import { Link, useParams } from "react-router-dom";
import theme from "../styles/theme";
import supabase from "../lib/supabase";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = React.useState(null);
  const [teacherEmail, setTeacherEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    const loadCourse = async () => {
      setIsLoading(true);
      setLoadError("");
      const { data, error } = await supabase
        .from("courses")
        .select(
          "id, title, description, teacher_id, created_at, more_details, difficulty, helpful_percentage, helpful_percentage_work"
        )
        .eq("id", id)
        .single();

      if (!isMounted) {
        return;
      }

      if (error) {
        setLoadError(error.message);
        setCourse(null);
        setIsLoading(false);
        return;
      }

      setCourse(data);
      setIsLoading(false);

      if (data?.teacher_id) {
        const { data: teacher } = await supabase
          .from("profiles")
          .select("email")
          .eq("id", data.teacher_id)
          .single();
        if (isMounted) {
          setTeacherEmail(teacher?.email || "");
        }
      }
    };

    if (id) {
      loadCourse();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/lesson" style={styles.backLink}>
          Back to courses
        </Link>
        <h1 style={styles.title}>{course?.title || "Course Details"}</h1>
        <p style={styles.subtitle}>
          {course?.description || "No description provided."}
        </p>
      </div>

      {isLoading ? (
        <div style={styles.card}>
          <p>Loading course...</p>
        </div>
      ) : loadError ? (
        <div style={styles.card}>
          <p>{loadError}</p>
        </div>
      ) : !course ? (
        <div style={styles.card}>
          <p>Course not found.</p>
        </div>
      ) : (
        <div style={styles.detailsGrid}>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Overview</h2>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Course ID</span>
              <span style={styles.detailValue}>{course.id}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Teacher</span>
              <span style={styles.detailValue}>
                {teacherEmail || course.teacher_id}
              </span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Created At</span>
              <span style={styles.detailValue}>{course.created_at}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Difficulty</span>
              <span style={styles.detailValue}>{course.difficulty || "—"}</span>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Details</h2>
            <p style={styles.paragraph}>
              {course.more_details || "No additional details provided."}
            </p>
          </div>

          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Helpful Scores</h2>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Helpful Percentage</span>
              <span style={styles.detailValue}>
                {course.helpful_percentage ?? "—"}
              </span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Helpful Percentage Work</span>
              <span style={styles.detailValue}>
                {course.helpful_percentage_work ?? "—"}
              </span>
            </div>
          </div>
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
  },
  header: {
    maxWidth: "1000px",
    margin: "0 auto",
    marginBottom: theme.spacing.xl,
  },
  backLink: {
    display: "inline-block",
    marginBottom: theme.spacing.md,
    textDecoration: "none",
    color: theme.colors.primary.main,
    fontWeight: theme.typography.fontWeight.medium,
  },
  title: {
    fontSize: theme.typography.fontSize["3xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    margin: 0,
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: theme.spacing.lg,
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    marginTop: 0,
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing.md,
    padding: `${theme.spacing.sm} 0`,
    borderBottom: `1px solid ${theme.colors.neutral.gray200}`,
  },
  detailLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  detailValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    textAlign: "right",
    wordBreak: "break-word",
  },
  paragraph: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: 1.6,
    margin: 0,
  },
};

export default CourseDetails;
