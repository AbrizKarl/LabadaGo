package com.example.labadago.network

// Mirrors Backend/.../dto/RegisterRequest.java field-for-field.
data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String,
    val role: String
)
