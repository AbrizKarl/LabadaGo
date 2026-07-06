package edu.cit.Abriz.LabadaGo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

// this class handles making and reading our JWT tokens
// our SRS (NFR-002) requires JWT authentication, so this is where that lives
@Component
public class JwtUtil {

    // secret key used to sign the token, in a real app this would come from a config file
    // for school project purposes we just hardcode a long string here
    private final String SECRET = "labadago-super-secret-key-for-jwt-signing-school-project-2026";

    private final Key signingKey = Keys.hmacShaKeyFor(SECRET.getBytes());

    // token will expire after 24 hours
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    // creates a new token for the given user email
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // pulls the email back out of a token
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    // checks if a token is valid (not expired, not tampered with)
    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // if anything goes wrong (expired, bad signature, etc), token is not valid
            return false;
        }
    }
}
