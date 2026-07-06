import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Card from "../components/ui/Card";
import styles from "./AuthLayout.module.css";

/**
 * Deliberately quiet: logo, heading, form, done. No marketing panel, no
 * illustration — matches the sign-in pattern used by Stripe, Linear, and
 * GitHub, where the login wall is a utility, not a pitch.
 */
function AuthLayout({ heading, subheading, children, footer }) {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.brand}>
        <Logo size={26} />
        <span className={styles.brandName}>LabadaGo</span>
      </Link>

      <div className={styles.cardWrap}>
        <Card padding="md">
          <h1 className={styles.heading}>{heading}</h1>
          {subheading && <p className={styles.subheading}>{subheading}</p>}
          {children}
        </Card>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}

export default AuthLayout;
