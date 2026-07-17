import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Card from "../components/ui/Card";
import FormField from "../components/ui/FormField";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import PasswordToggleButton from "../components/ui/PasswordToggleButton";
import { LockIcon, UserIcon } from "../components/icons/Icon";
import { getMyProfile, updateMyProfile, changeMyPassword } from "../api/usersApi";
import styles from "./SettingsPage.module.css";

/**
 * Two independent forms, each with its own save button and its own
 * loading/success/error state — saving your name shouldn't require
 * (or risk) touching your password, and vice versa.
 */
function SettingsPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const [isSavingName, setIsSavingName] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [nameError, setNameError] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    getMyProfile()
      .then((profile) => {
        setEmail(profile.email);
        setName(profile.name);
      })
      .catch(() => {
        /* if this fails, the fields just stay blank — not fatal to the page */
      })
      .finally(() => setIsLoadingProfile(false));
  }, [navigate]);

  const handleSaveName = async (e) => {
    e.preventDefault();
    setNameMessage("");
    setIsSavingName(true);
    try {
      const updated = await updateMyProfile(name);
      setName(updated.name);
      localStorage.setItem("name", updated.name);
      setNameError(false);
      setNameMessage("Your name has been updated.");
    } catch (err) {
      setNameError(true);
      setNameMessage(err.message || "Couldn't update your name.");
    } finally {
      setIsSavingName(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage("");

    if (newPassword.length < 8) {
      setPasswordError(true);
      setPasswordMessage("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(true);
      setPasswordMessage("New passwords don't match.");
      return;
    }

    setIsSavingPassword(true);
    try {
      await changeMyPassword(currentPassword, newPassword);
      setPasswordError(false);
      setPasswordMessage("Your password has been changed.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(true);
      setPasswordMessage(err.message || "Couldn't change your password.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <AppShell pageTitle="Settings">
      <div className={styles.pageTitle}>Account settings</div>
      <div className={styles.pageSubtitle}>Manage your profile and password.</div>

      <div className={styles.grid}>
        <Card className={styles.sectionCard}>
          <div className={styles.sectionTitle}>Profile</div>
          <div className={styles.sectionDescription}>Your name is shown to staff on your orders.</div>

          <form onSubmit={handleSaveName}>
            <FormField label="Email">
              <div className={styles.readOnlyField}>{isLoadingProfile ? "Loading..." : email}</div>
            </FormField>

            <FormField label="Full name" htmlFor="settings-name">
              <Input
                id="settings-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<UserIcon size={17} />}
                disabled={isLoadingProfile}
              />
            </FormField>

            <div className={styles.actionsRow}>
              <Button type="submit" variant="primary" isLoading={isSavingName} disabled={isLoadingProfile}>
                {isSavingName ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>

          {nameMessage && (
            <div className={styles.messageWrap}>
              <Alert variant={nameError ? "error" : "success"}>{nameMessage}</Alert>
            </div>
          )}
        </Card>

        <Card className={styles.sectionCard}>
          <div className={styles.sectionTitle}>Change password</div>
          <div className={styles.sectionDescription}>
            You'll need your current password to set a new one.
          </div>

          <form onSubmit={handleChangePassword}>
            <FormField label="Current password" htmlFor="settings-current-password">
              <Input
                id="settings-current-password"
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                leftIcon={<LockIcon size={17} />}
                autoComplete="current-password"
              />
            </FormField>

            <FormField label="New password" htmlFor="settings-new-password">
              <Input
                id="settings-new-password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                leftIcon={<LockIcon size={17} />}
                rightSlot={
                  <PasswordToggleButton visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
                }
                autoComplete="new-password"
              />
            </FormField>

            <FormField label="Confirm new password" htmlFor="settings-confirm-password">
              <Input
                id="settings-confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={<LockIcon size={17} />}
                autoComplete="new-password"
              />
            </FormField>

            <div className={styles.actionsRow}>
              <Button type="submit" variant="primary" isLoading={isSavingPassword}>
                {isSavingPassword ? "Updating..." : "Update password"}
              </Button>
            </div>
          </form>

          {passwordMessage && (
            <div className={styles.messageWrap}>
              <Alert variant={passwordError ? "error" : "success"}>{passwordMessage}</Alert>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}

export default SettingsPage;
