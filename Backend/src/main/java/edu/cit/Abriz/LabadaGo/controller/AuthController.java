package edu.cit.Abriz.LabadaGo.controller;

import edu.cit.Abriz.LabadaGo.dto.AuthResponse;
import edu.cit.Abriz.LabadaGo.dto.LoginRequest;
import edu.cit.Abriz.LabadaGo.dto.RegisterRequest;
import edu.cit.Abriz.LabadaGo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// this controller handles the two endpoints our SRS asks for:
// FR-001 User Registration and FR-002 User Login
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // POST /api/auth/register
    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }
}
