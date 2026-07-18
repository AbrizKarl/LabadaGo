package com.example.labadago.network

object ApiConfig {
    // 10.0.2.2 is the Android emulator's special alias for the host
    // machine's localhost - this is where the Spring Boot backend runs
    // during development (mvn spring-boot:run, port 8080). Change this
    // single constant when the backend gets a real deployed URL.
    const val BASE_URL = "http://10.0.2.2:8080/"
}
