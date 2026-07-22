package edu.cit.Abriz.LabadaGo.users;

// Settings only allows changing the display name for now — email is left
// out on purpose, since changing it would invalidate the user's existing
// JWT (which is keyed by email) and needs a proper re-verification flow
// that's out of scope here
public class UpdateProfileRequest {

    private String name;

    public UpdateProfileRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
