import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import FormField from "../components/ui/FormField";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import PasswordToggleButton from "../components/ui/PasswordToggleButton";
import { MailIcon, LockIcon } from "../components/icons/Icon";
import styles from "./AuthForm.module.css";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const emailError = touched.email && !isValidEmail(email) ? "Enter a valid email address." : "";
  const passwordError = touched.password && password.length === 0 ? "Password is required." : "";

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isValidEmail(email) || password.length === 0) {
      setIsError(true);
      setMessage("Fix the highlighted fields to continue.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        setIsError(false);
        setMessage(data.message || "Signed in. Redirecting...");
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("role", data.role);
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        setIsError(true);
        setMessage(data.message || "We couldn't sign you in with those details.");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading="Sign in"
      subheading="Welcome back — enter your details to continue."
      footer={
        <>
          Don't have an account? <Link to="/register">Create one</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Email" error={emailError} htmlFor="login-email">
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            hasError={!!emailError}
            autoComplete="email"
            autoFocus
            leftIcon={<MailIcon size={17} />}
          />
        </FormField>

        <FormField label="Password" error={passwordError} htmlFor="login-password">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            hasError={!!passwordError}
            autoComplete="current-password"
            leftIcon={<LockIcon size={17} />}
            rightSlot={
              <PasswordToggleButton visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
            }
          />
        </FormField>

        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {message && (
        <div className={styles.messageWrap}>
          <Alert variant={isError ? "error" : "success"}>{message}</Alert>
        </div>
      )}
    </AuthLayout>
  );
}

export default Login;
