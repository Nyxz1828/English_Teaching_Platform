import React from "react";
import theme from "../styles/theme";
import supabase from "../lib/supabase";

function Profile() {
  const [authUser, setAuthUser] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [enrollments, setEnrollments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");
  const [deletingId, setDeletingId] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;

    const loadProfile = async (userId) => {
      const { data } = await supabase
        .from("profiles")
        .select("email, role")
        .eq("id", userId)
        .single();

      if (isMounted) {
        setProfile(data ?? null);
      }
    };

    const loadEnrollments = async (userId) => {
      setIsLoading(true);
      setLoadError("");
      const { data, error } = await supabase
        .from("enrollments")
        .select(
          "id, enrolled_at, courses ( id, title, description, helpful_percentage, helpful_percentage_work )"
        )
        .eq("student_id", userId)
        .order("enrolled_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (error) {
        setLoadError(error.message);
        setEnrollments([]);
      } else {
        setEnrollments(data ?? []);
      }
      setIsLoading(false);
    };

    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data?.session?.user ?? null;

      if (!isMounted) {
        return;
      }

      setAuthUser(sessionUser);
      if (sessionUser) {
        await loadProfile(sessionUser.id);
        await loadEnrollments(sessionUser.id);
      } else {
        setProfile(null);
        setEnrollments([]);
        setIsLoading(false);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user ?? null;
        setAuthUser(sessionUser);
        if (sessionUser) {
          loadProfile(sessionUser.id);
          loadEnrollments(sessionUser.id);
        } else {
          setProfile(null);
          setEnrollments([]);
          setIsLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const displayEmail = profile?.email || authUser?.email || "Guest";
  const displayName = displayEmail.includes("@")
    ? displayEmail.split("@")[0]
    : displayEmail;

  const handleUnenroll = async (enrollmentId) => {
    if (!authUser) {
      return;
    }

    setDeletingId(enrollmentId);
    const { error } = await supabase
      .from("enrollments")
      .delete()
      .eq("id", enrollmentId);

    if (!error) {
      setEnrollments((current) =>
        current.filter((item) => item.id !== enrollmentId)
      );
    } else {
      setLoadError(error.message);
    }
    setDeletingId(null);
  };

  const stats = [
    { label: "已完成課程", value: "12", icon: "✅", color: theme.colors.success.main },
    {
      label: "進行中課程",
      value: `${enrollments.length}`,
      icon: "📚",
      color: theme.colors.primary.main,
    },
    { label: "學習時數", value: "156", icon: "⏰", color: theme.colors.secondary.main },
    { label: "成就徽章", value: "8", icon: "🏆", color: theme.colors.warning.main },
  ];

  const totalHelpful = enrollments.reduce(
    (sum, item) => sum + (item.courses?.helpful_percentage ?? 0),
    0
  );
  const totalHelpfulWork = enrollments.reduce(
    (sum, item) => sum + (item.courses?.helpful_percentage_work ?? 0),
    0
  );
  const helpfulFill = Math.min(totalHelpful, 100);
  const helpfulWorkFill = Math.min(totalHelpfulWork, 100);

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            {displayName ? displayName.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 style={styles.userName}>{displayName || "User"}</h1>
          <p style={styles.userEmail}>{displayEmail}</p>
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
                <span style={styles.progressPercent}>{totalHelpful}%</span>
              </div>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${helpfulFill}%`,
                    backgroundColor: theme.colors.primary.main,
                  }}
                />
              </div>
            </div>
            <div style={styles.progressItem}>
              <div style={styles.progressHeader}>
                <span style={styles.progressLabel}>商務英語寫作</span>
                <span style={styles.progressPercent}>{totalHelpfulWork}%</span>
              </div>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${helpfulWorkFill}%`,
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
              <span style={styles.infoValue}>
                {profile?.created_at || "—"}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>UUID</span>
              <span style={styles.infoValue}>{authUser?.id || "—"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>角色</span>
              <span style={styles.infoValue}>{profile?.role || "—"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Email</span>
              <span style={styles.infoValue}>{profile?.email || "—"}</span>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Enrolled Courses</h2>
          {isLoading ? (
            <p style={styles.emptyState}>Loading enrollments...</p>
          ) : loadError ? (
            <p style={styles.emptyState}>{loadError}</p>
          ) : !authUser ? (
            <p style={styles.emptyState}>Log in to see your enrolled courses.</p>
          ) : enrollments.length === 0 ? (
            <p style={styles.emptyState}>No courses enrolled yet.</p>
          ) : (
            <div style={styles.courseList}>
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} style={styles.courseCard}>
                  <div style={styles.courseTitle}>
                    {enrollment.courses?.title || "Untitled course"}
                  </div>
                  <div style={styles.courseMeta}>
                    {enrollment.courses?.description || "No description provided."}
                  </div>
                  <div style={styles.courseMeta}>
                    Enrolled{" "}
                    {new Date(enrollment.enrolled_at).toLocaleDateString()}
                  </div>
                  <button
                    type="button"
                    style={styles.deleteButton}
                    onClick={() => handleUnenroll(enrollment.id)}
                    disabled={deletingId === enrollment.id}
                  >
                    {deletingId === enrollment.id ? "Removing..." : "Remove"}
                  </button>
                </div>
              ))}
            </div>
          )}
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
  emptyState: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    margin: 0,
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
  deleteButton: {
    marginTop: theme.spacing.sm,
    border: "none",
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.error?.main || "#b00020",
    color: theme.colors.text.inverse,
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: theme.typography.fontSize.sm,
  },
};

export default Profile;
