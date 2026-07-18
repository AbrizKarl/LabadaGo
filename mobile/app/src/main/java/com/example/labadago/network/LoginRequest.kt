package com.example.labadago.network

// Mirrors Backend/.../dto/LoginRequest.java field-for-field.
data class LoginRequest(
    val email: String,
    val password: String
)
