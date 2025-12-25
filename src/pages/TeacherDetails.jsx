import React from "react";
import { Link, useParams } from "react-router-dom";
import theme from "../styles/theme";
import supabase from "../lib/supabase";

function TeacherDetails() {
  const { id } = useParams();
  const [teacher, setTeacher] = React.useState(null);
  const [courses, setCourses] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    const loadTeacher = async () => {
      setIsLoading(true);
      setLoadError("");
      const { data: teacherData, error: teacherError } = await supabase
        .from("profiles")
        .select("id, email, role, created_at")
        .eq("id", id)
        .single();

      if (!isMounted) {
        return;
      }

      if (teacherError) {
        setLoadError(teacherError.message);
        setTeacher(null);
        setIsLoading(false);
        return;
      }

      setTeacher(teacherData);

      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select(
          "id, title, description, created_at, difficulty, helpful_percentage, helpful_percentage_work"
        )
        .eq("teacher_id", id)
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (courseError) {
        setLoadError(courseError.message);
        setCourses([]);
      } else {
        setCourses(courseData ?? []);
      }
      setIsLoading(false);
    };

    if (id) {
      loadTeacher();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/teachers" style={styles.backLink}>
          Back to teachers
        </Link>
        <h1 style={styles.title}>Teacher Details</h1>
      </div>

      {isLoading ? (
        <div style={styles.card}>
          <p>Loading teacher...</p>
        </div>
      ) : loadError ? (
        <div style={styles.card}>
          <p>{loadError}</p>
        </div>
      ) : !teacher ? (
        <div style={styles.card}>
          <p>Teacher not found.</p>
        </div>
      ) : (
        <>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Profile</h2>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>UUID</span>
              <span style={styles.detailValue}>{teacher.id}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Email</span>
              <span style={styles.detailValue}>{teacher.email}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Role</span>
              <span style={styles.detailValue}>{teacher.role}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Created At</span>
              <span style={styles.detailValue}>{teacher.created_at}</span>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Courses</h2>
            {courses.length === 0 ? (
              <p>No courses found for this teacher.</p>
            ) : (
              <div style={styles.courseList}>
                {courses.map((course) => (
                  <div key={course.id} style={styles.courseCard}>
                    <div style={styles.courseTitle}>{course.title}</div>
                    <div style={styles.courseMeta}>
                      {course.description || "No description provided."}
                    </div>
                    <div style={styles.courseMeta}>
                      Created: {course.created_at || "—"}
                    </div>
                    <div style={styles.courseMeta}>
                      Difficulty: {course.difficulty || "—"}
                    </div>
                    <div style={styles.courseMeta}>
                      Helpful %: {course.helpful_percentage ?? "—"}
                    </div>
                    <div style={styles.courseMeta}>
                      Helpful % (Work): {course.helpful_percentage_work ?? "—"}
                    </div>
                    <Link to={`/course/${course.id}`} style={styles.courseLink}>
                      View course details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
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
    margin: 0,
  },
  card: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.xl,
    maxWidth: "1000px",
    margin: "0 auto",
    marginBottom: theme.spacing.lg,
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
  courseList: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
  },
  courseCard: {
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.neutral.gray200}`,
    padding: theme.spacing.md,
  },
  courseTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  courseMeta: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  courseLink: {
    display: "inline-block",
    marginTop: theme.spacing.sm,
    textDecoration: "none",
    color: theme.colors.primary.main,
    fontWeight: theme.typography.fontWeight.medium,
  },
};

export default TeacherDetails;
