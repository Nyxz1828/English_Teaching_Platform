import React, { useState, useMemo, useEffect } from "react";
import theme from "../styles/theme";
import { useToastContext } from "../contexts/ToastContext";
import Tooltip from "../components/Tooltip";
import SearchBar from "../components/SearchBar";
import supabase from "../lib/supabase";

function Teachers() {
  const toast = useToastContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadTeachers = async () => {
      setIsLoading(true);
      setLoadError("");
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, role")
        .eq("role", "teacher")
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (error) {
        setLoadError(error.message);
        setTeachers([]);
      } else {
        const mapped = (data ?? []).map((teacher, index) => {
          const email = teacher.email || "teacher@example.com";
          const name = email.includes("@") ? email.split("@")[0] : email;
          return {
            id: teacher.id,
            name,
            email,
            role: teacher.role,
            avatar: name.charAt(0).toUpperCase(),
            color:
              index % 3 === 0
                ? theme.colors.primary.main
                : index % 3 === 1
                ? theme.colors.secondary.main
                : theme.colors.success.main,
          };
        });
        setTeachers(mapped);
      }
      setIsLoading(false);
    };

    loadTeachers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTeachers = useMemo(() => {
    if (!searchTerm) return teachers;
    return teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, teachers]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Teachers</h1>
        <p style={styles.subtitle}>
          Meet our teachers and connect with them for guidance.
        </p>
        <div style={styles.searchContainer}>
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search teachers..."
          />
        </div>
      </div>

      {isLoading ? (
        <div style={styles.noResults}>
          <p>Loading teachers...</p>
        </div>
      ) : loadError ? (
        <div style={styles.noResults}>
          <p>{loadError}</p>
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div style={styles.noResults}>
          {searchTerm ? (
            <p>No teachers match "{searchTerm}".</p>
          ) : (
            <p>No teachers available.</p>
          )}
        </div>
      ) : (
        <div style={styles.teachersGrid}>
          {filteredTeachers.map((teacher, index) => (
            <div
              key={teacher.id}
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
                <p style={styles.teacherSubject}>{teacher.email}</p>
                <p style={styles.experience}>{teacher.role}</p>
                <Tooltip text={`Contact ${teacher.name}`}>
                  <button
                    style={{
                      ...styles.contactButton,
                      borderColor: teacher.color,
                      color: teacher.color,
                    }}
                    onClick={() => {
                      toast.info(`Reaching out to ${teacher.name}...`);
                    }}
                    className="hover-lift"
                  >
                    К?_ЗцнСTЖ,о
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
  experience: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.sm,
    textTransform: "capitalize",
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
