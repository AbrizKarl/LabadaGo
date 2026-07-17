package edu.cit.Abriz.LabadaGo.dto;

// one row on the staff-facing Customers page
public class CustomerSummaryResponse {

    private Long userId;
    private String name;
    private String email;
    private long totalOrders;

    public CustomerSummaryResponse() {
    }

    public CustomerSummaryResponse(Long userId, String name, String email, long totalOrders) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.totalOrders = totalOrders;
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

    public long getTotalOrders() {
        return totalOrders;
    }
}
