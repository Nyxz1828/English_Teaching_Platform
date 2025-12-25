import React from "react";
import { Link, useLocation } from "react-router-dom";
import theme from "../styles/theme";
import supabase from "../lib/supabase";

export default function Header() {
  const location = useLocation();
  const [authUser, setAuthUser] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [isAuthLoading, setIsAuthLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const loadOrCreateProfile = async (user) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, role")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        const { data: updated, error: updateError } = await supabase
          .from("profiles")
          .update({ email: user.email })
          .eq("id", user.id)
          .select("id, email, role")
          .single();

        if (isMounted) {
          setProfile(updateError ? data : updated ?? data ?? null);
        }
        return;
      }

      const { data: created, error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          email: user.email,
          role: "student",
        })
        .select("id, email, role")
        .single();

      if (isMounted) {
        if (insertError) {
          setProfile(null);
        } else {
          setProfile(created ?? null);
        }
      }
    };

    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data?.session?.user ?? null;

      if (!isMounted) {
        return;
      }

      setAuthUser(sessionUser);
      if (sessionUser) {
        await loadOrCreateProfile(sessionUser);
      } else {
        setProfile(null);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user ?? null;
        setAuthUser(sessionUser);
        if (sessionUser) {
          loadOrCreateProfile(sessionUser);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleSignIn = async (event) => {
    event.preventDefault();
    setAuthError("");
    setIsAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthError(error.message);
    }
    setIsAuthLoading(false);
  };

  const handleSignOut = async () => {
    setAuthError("");
    setIsAuthLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError(error.message);
    }
    setIsAuthLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setIsAuthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setAuthError(error.message);
      setIsAuthLoading(false);
    }
  };

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

        <div style={styles.userArea}>
          {authUser ? (
            <>
              <span style={styles.userEmail}>
                {profile?.email || authUser.email || "Signed in"}
              </span>
              {profile?.role ? (
                <span style={styles.userRole}>{profile.role}</span>
              ) : null}
              <button
                type="button"
                style={styles.authButton}
                onClick={handleSignOut}
                disabled={isAuthLoading}
              >
                Log out
              </button>
            </>
          ) : (
            <form style={styles.authForm} onSubmit={handleSignIn}>
              <span style={styles.userHint}>Guest</span>
              <button
                type="button"
                style={styles.authButtonSecondary}
                onClick={handleGoogleSignIn}
                disabled={isAuthLoading}
              >
                Log in with Google
              </button>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={styles.authInput}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={styles.authInput}
                required
              />
              <button
                type="submit"
                style={styles.authButton}
                disabled={isAuthLoading}
              >
                Log in
              </button>
            </form>
          )}
        </div>
        {authError ? <div style={styles.authError}>{authError}</div> : null}
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
  userArea: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    borderLeft: `1px solid ${theme.colors.neutral.gray200}`,
  },
  authForm: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  authInput: {
    border: `1px solid ${theme.colors.neutral.gray200}`,
    borderRadius: theme.borderRadius.sm,
    padding: "4px 8px",
    fontSize: theme.typography.fontSize.sm,
  },
  authButton: {
    border: "none",
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.primary.main,
    color: theme.colors.primary.contrastText,
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: theme.typography.fontSize.sm,
  },
  authButtonSecondary: {
    border: `1px solid ${theme.colors.neutral.gray200}`,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background.paper,
    color: theme.colors.text.primary,
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: theme.typography.fontSize.sm,
  },
  authError: {
    marginLeft: theme.spacing.md,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.error?.main || "#b00020",
  },
  userEmail: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
  },
  userRole: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    backgroundColor: `${theme.colors.primary.main}15`,
    padding: "2px 6px",
    borderRadius: theme.borderRadius.full,
    textTransform: "capitalize",
  },
  userHint: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
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
