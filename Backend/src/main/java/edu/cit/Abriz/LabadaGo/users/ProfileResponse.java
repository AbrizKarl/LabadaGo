package edu.cit.Abriz.LabadaGo.users;

// what we send back for "my profile" — deliberately excludes the
// password hash, unlike the User entity itself
public class ProfileResponse {

    private Long userId;
    private String name;
    private String email;
    private String role;

    public ProfileResponse() {
    }

    public ProfileResponse(Long userId, String name, String email, String role) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}
