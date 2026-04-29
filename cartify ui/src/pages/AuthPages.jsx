import { useState } from "react";
import '../styles/AuthPages.css';

// ─── Inline Styles ────────────────────────────────────────────────────────────
const styles = {
  // Layout
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#f5f4f2",
    backgroundImage:
      "radial-gradient(circle at 20% 20%, rgba(90,79,207,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(90,79,207,0.05) 0%, transparent 50%)",
  },

  // Nav
  nav: {
    width: "100%",
    maxWidth: "960px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "32px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "Georgia, serif",
    fontWeight: 700,
    fontSize: "22px",
    color: "#1a1a2e",
    textDecoration: "none",
    cursor: "pointer",
  },
  logoIcon: {
    width: "36px",
    height: "36px",
    background: "#5a4fcf",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "18px",
  },
  searchWrap: {
    flex: 1,
    maxWidth: "380px",
    margin: "0 24px",
    position: "relative",
  },
  searchInput: {
    width: "100%",
    padding: "10px 16px 10px 40px",
    border: "1.5px solid #e2e0f0",
    borderRadius: "50px",
    background: "white",
    fontFamily: "inherit",
    fontSize: "14px",
    color: "#6b6b8a",
    outline: "none",
  },
  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b6b8a",
    fontSize: "15px",
    pointerEvents: "none",
  },
  cartBtn: {
    position: "relative",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "22px",
    color: "#1a1a2e",
  },
  cartBadge: {
    position: "absolute",
    top: "-4px",
    right: "-6px",
    background: "#5a4fcf",
    color: "white",
    fontSize: "10px",
    width: "17px",
    height: "17px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
  },

  // Card
  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "44px 40px 40px",
    boxShadow: "0 4px 40px rgba(90,79,207,0.10), 0 1px 4px rgba(0,0,0,0.04)",
  },
  cardTitle: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "32px",
    fontWeight: 700,
    color: "#1a1a2e",
    marginBottom: "6px",
    letterSpacing: "-0.5px",
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "#6b6b8a",
    marginBottom: "32px",
  },

  // Field
  field: { marginBottom: "20px" },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "8px",
    letterSpacing: "0.2px",
  },
  inputWrap: { position: "relative" },
  inputIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b6b8a",
    fontSize: "16px",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "13px 16px 13px 42px",
    border: "1.5px solid #e2e0f0",
    borderRadius: "12px",
    background: "#f8f7fe",
    fontFamily: "inherit",
    fontSize: "14.5px",
    color: "#1a1a2e",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  eyeBtn: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6b6b8a",
    fontSize: "16px",
    padding: "4px",
  },

  // Remember / Forgot row
  rowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  rememberLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13.5px",
    color: "#6b6b8a",
    cursor: "pointer",
  },
  forgotLink: {
    fontSize: "13.5px",
    color: "#5a4fcf",
    fontWeight: 500,
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit",
  },

  // Primary button
  btnPrimary: {
    width: "100%",
    padding: "14px",
    background: "#5a4fcf",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.2px",
    boxShadow: "0 4px 16px rgba(90,79,207,0.30)",
    marginBottom: "24px",
  },

  // Divider
  dividerWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  dividerLine: { flex: 1, height: "1px", background: "#e2e0f0" },
  dividerText: { fontSize: "13px", color: "#6b6b8a", whiteSpace: "nowrap" },

  // Social buttons
  socialRow: { display: "flex", gap: "12px", marginBottom: "28px" },
  btnSocial: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "14px",
    border: "1.5px solid #e2e0f0",
    borderRadius: "12px",
    background: "white",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: 600,
    color: "#1a1a2e",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  // Switch text
  switchText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#6b6b8a",
  },
  switchLink: {
    color: "#5a4fcf",
    fontWeight: 600,
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    fontSize: "14px",
  },

  // Alert messages
  successMsg: {
    background: "#ecfdf5",
    border: "1.5px solid #6ee7b7",
    color: "#065f46",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "13.5px",
    marginBottom: "16px",
    fontWeight: 500,
  },
  errorMsg: {
    background: "#fef2f2",
    border: "1.5px solid #fca5a5",
    color: "#991b1b",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "13.5px",
    marginBottom: "16px",
    fontWeight: 500,
  },
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);


const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

// ─── Shared Sub-Components ────────────────────────────────────────────────────
function InputField({
  label,
  type = "text",
  id,
  placeholder,
  icon,
  value,
  onChange,
}) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPass ? "text" : "password") : type;

  return (
    <div style={styles.field}>
      <label style={styles.label} htmlFor={id}>
        {label}
      </label>
      <div style={styles.inputWrap}>
        <span style={styles.inputIcon}>{icon}</span>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={styles.input}
          onFocus={(e) => {
            e.target.style.borderColor = "#5a4fcf";
            e.target.style.boxShadow = "0 0 0 3px rgba(90,79,207,0.12)";
            e.target.style.background = "white";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e0f0";
            e.target.style.boxShadow = "none";
            e.target.style.background = "#f8f7fe";
          }}
        />
        {isPassword && (
          <button
            style={styles.eyeBtn}
            type="button"
            onClick={() => setShowPass((p) => !p)}
          >
            {showPass ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  );
}

function SocialButtons() {
  return (
    <>
      <div style={styles.dividerWrap}>
        <div style={styles.dividerLine} />
        <span style={styles.dividerText}>Or continue with</span>
        <div style={styles.dividerLine} />
      </div>
      <button 
        style={styles.btnSocial} 
        type="button"
        onMouseEnter={(e) => {
          e.target.style.background = "#f8f7fe";
          e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "white";
          e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
        }}
      >
        <GoogleIcon /> Sign in with Google
      </button>
    </>
  );
}

// ─── Sign In Form ─────────────────────────────────────────────────────────────
export function SignInForm({ onSwitch, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) return setError("Please fill in all fields.");
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Login failed');
      
      setSuccess("✓ Signed in successfully! Redirecting...");
      setTimeout(() => {
        setSuccess("");
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.cardTitle}>Welcome Back</h1>
      <p style={styles.cardSubtitle}>Sign in to your account to continue</p>

      {error && <div style={styles.errorMsg}>{error}</div>}
      {success && <div style={styles.successMsg}>{success}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Email Address"
          type="email"
          id="signin-email"
          placeholder="you@example.com"
          icon={<MailIcon />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          id="signin-pass"
          placeholder="••••••••"
          icon={<LockIcon />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={styles.rowBetween}>
          <label style={styles.rememberLabel}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{
                width: 16,
                height: 16,
                accentColor: "#5a4fcf",
                cursor: "pointer",
              }}
            />
            Remember me
          </label>
          <button type="button" style={styles.forgotLink}>
            Forgot password?
          </button>
        </div>

        <button type="submit" style={styles.btnPrimary}>
          Sign In
        </button>
      </form>

      <SocialButtons />

      <p style={styles.switchText}>
        Don't have an account?{" "}
        <button type="button" style={styles.switchLink} onClick={onSwitch}>
          Sign up
        </button>
      </p>
    </div>
  );
}

// ─── Sign Up Form ─────────────────────────────────────────────────────────────
export function SignUpForm({ onSwitch, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name || !email || !password)
      return setError("Please fill in all fields.");
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      
      setSuccess("✓ Account created! Welcome to Cartify!");
      setTimeout(() => {
        setSuccess("");
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ name, email }));
        onLogin({ name, email });
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.cardTitle}>Create Account</h1>
      <p style={styles.cardSubtitle}>Sign up to start shopping</p>

      {error && <div style={styles.errorMsg}>{error}</div>}
      {success && <div style={styles.successMsg}>{success}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Full Name"
          id="signup-name"
          placeholder="John Doe"
          icon={<UserIcon />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Email Address"
          type="email"
          id="signup-email"
          placeholder="you@example.com"
          icon={<MailIcon />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          id="signup-pass"
          placeholder="••••••••"
          icon={<LockIcon />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          style={{ ...styles.btnPrimary, marginTop: "8px" }}
        >
          Create Account
        </button>
      </form>

      <SocialButtons />

      <p style={styles.switchText}>
        Already have an account?{" "}
        <button type="button" style={styles.switchLink} onClick={onSwitch}>
          Sign in
        </button>
      </p>
    </div>
  );
}
