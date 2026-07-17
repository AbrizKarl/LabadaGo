package edu.cit.Abriz.LabadaGo.controller;

import edu.cit.Abriz.LabadaGo.dto.ChangePasswordRequest;
import edu.cit.Abriz.LabadaGo.dto.ProfileResponse;
import edu.cit.Abriz.LabadaGo.dto.UpdateProfileRequest;
import edu.cit.Abriz.LabadaGo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

// requires a valid JWT (see SecurityConfig) — Authentication gives us the
// caller's own email, so this always acts on "my own account," never
// someone else's, regardless of what the client sends
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users/me — the Settings page's initial load
    @GetMapping("/me")
    public ProfileResponse getMyProfile(Authentication authentication) {
        return userService.getProfile(authentication.getName());
    }

    // PUT /api/users/me — update display name
    @PutMapping("/me")
    public ProfileResponse updateMyProfile(Authentication authentication, @RequestBody UpdateProfileRequest request) {
        return userService.updateName(authentication.getName(), request.getName());
    }

    // PUT /api/users/me/password — change password
    @PutMapping("/me/password")
    public void changeMyPassword(Authentication authentication, @RequestBody ChangePasswordRequest request) {
        userService.changePassword(authentication.getName(), request.getCurrentPassword(), request.getNewPassword());
    }
}
