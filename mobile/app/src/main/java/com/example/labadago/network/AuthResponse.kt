package com.example.labadago.network

// Mirrors Backend/.../dto/AuthResponse.java. Both /api/auth/register and
// /api/auth/login always reply with HTTP 200 - success vs. failure is
// decided by whether `token` is null, NOT by the HTTP status code. On
// failure, `message` holds the real reason (e.g. "Incorrect password").
data class AuthResponse(
    val message: String?,
    val token: String?,
    val name: String?,
    val role: String?
)
