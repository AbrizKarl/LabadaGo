package edu.cit.Abriz.LabadaGo.service;

import edu.cit.Abriz.LabadaGo.dto.AuthResponse;
import edu.cit.Abriz.LabadaGo.dto.LoginRequest;
import edu.cit.Abriz.LabadaGo.dto.RegisterRequest;
import edu.cit.Abriz.LabadaGo.model.User;
import edu.cit.Abriz.LabadaGo.repository.UserRepository;
import edu.cit.Abriz.LabadaGo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// this is where all the actual registration/login logic happens
// controller just calls these methods and returns the result
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // handles creating a new user account
    public AuthResponse registerUser(RegisterRequest request) {

        // BR-008: emails must be unique, so we check first
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("Email is already registered", null, null, null);
        }

        // hash the password before saving it, never store plain text passwords
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User newUser = new User(
                request.getName(),
                request.getEmail(),
                hashedPassword,
                request.getRole()
        );

        userRepository.save(newUser);

        // generate a token right away so the user is logged in after registering
        String token = jwtUtil.generateToken(newUser.getEmail());

        return new AuthResponse("Registration successful", token, newUser.getName(), newUser.getRole());
    }

    // handles checking login credentials
    public AuthResponse loginUser(LoginRequest request) {

        User foundUser = userRepository.findByEmail(request.getEmail());

        if (foundUser == null) {
            return new AuthResponse("No account found with that email", null, null, null);
        }

        // compare the raw password typed in with the hashed one saved in the db
        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), foundUser.getPassword());

        if (!passwordMatches) {
            return new AuthResponse("Incorrect password", null, null, null);
        }

        String token = jwtUtil.generateToken(foundUser.getEmail());

        return new AuthResponse("Login successful", token, foundUser.getName(), foundUser.getRole());
    }
}
