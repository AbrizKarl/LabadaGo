import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import FormField from "../components/ui/FormField";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import SegmentedControl from "../components/ui/SegmentedControl";
import PasswordToggleButton from "../components/ui/PasswordToggleButton";
import { MailIcon, LockIcon, UserIcon } from "../components/icons/Icon";
import styles from "./AuthForm.module.css";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function passwordStrengthLabel(password) {
  if (password.length === 0) return null;
  if (password.length < 8) return { text: "At least 8 characters", tone: "weak" };
  const varietyCount = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((re) => re.test(password))
    .length;
  if (varietyCount <= 2) return { text: "Fair — add a number or symbol", tone: "fair" };
  return { text: "Strong password", tone: "strong" };
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [showPassword, setShowPassword] = useState(false);

  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const strength = passwordStrengthLabel(password);

  const nameError = touched.name && name.trim().length === 0 ? "Full name is required." : "";
  const emailError = touched.email && !isValidEmail(email) ? "Enter a valid email address." : "";
  const passwordError =
    touched.password && password.length > 0 && password.length < 8
      ? "Use at least 8 characters."
      : touched.password && password.length === 0
      ? "Password is required."
      : "";
  const confirmError =
    touched.confirmPassword && confirmPassword !== password ? "Passwords don't match." : "";

  const canSubmit =
    name.trim().length > 0 &&
    isValidEmail(email) &&
    password.length >= 8 &&
    confirmPassword === password;

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    if (!canSubmit) {
      setIsError(true);
      setMessage("Fix the highlighted fields to continue.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();

      if (data.token) {
        setIsError(false);
        setMessage(data.message || "Account created. Redirecting...");
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("role", data.role);
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        setIsError(true);
        setMessage(data.message || "We couldn't create your account.");
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
      heading="Create your account"
      subheading="Set up access for either a customer or shop staff role."
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Account type" htmlFor="reg-role">
          <SegmentedControl
            name="role"
            value={role}
            onChange={setRole}
            options={[
              { value: "CUSTOMER", label: "Customer" },
              { value: "STAFF", label: "Shop staff" },
            ]}
          />
        </FormField>

        <FormField label="Full name" error={nameError} htmlFor="reg-name">
          <Input
            id="reg-name"
            type="text"
            placeholder="Juan Dela Cruz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            hasError={!!nameError}
            autoComplete="name"
            leftIcon={<UserIcon size={17} />}
          />
        </FormField>

        <FormField label="Email" error={emailError} htmlFor="reg-email">
          <Input
            id="reg-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            hasError={!!emailError}
            autoComplete="email"
            leftIcon={<MailIcon size={17} />}
          />
        </FormField>

        <FormField
          label="Password"
          error={passwordError}
          htmlFor="reg-password"
          hint={
            !passwordError && strength ? (
              <span className={styles[`strength-${strength.tone}`]}>{strength.text}</span>
            ) : undefined
          }
        >
          <Input
            id="reg-password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            hasError={!!passwordError}
            autoComplete="new-password"
            leftIcon={<LockIcon size={17} />}
            rightSlot={<PasswordToggleButton visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />}
          />
        </FormField>

        <FormField label="Confirm password" error={confirmError} htmlFor="reg-confirm">
          <Input
            id="reg-confirm"
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            hasError={!!confirmError}
            autoComplete="new-password"
            leftIcon={<LockIcon size={17} />}
          />
        </FormField>

        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting} disabled={!canSubmit}>
          {isSubmitting ? "Creating account..." : "Create account"}
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

export default Register;
