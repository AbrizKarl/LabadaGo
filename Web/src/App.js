import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

/**
 * No global Navbar here on purpose: auth pages (Login/Register) use the
 * quiet, logo-only AuthLayout, while authenticated pages get their own
 * persistent AppShell (sidebar + topbar). A single shared top navbar
 * across both contexts is what caused the previous version to have
 * nowhere to grow — this keeps each context's chrome owned by the layout
 * that actually needs it.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
