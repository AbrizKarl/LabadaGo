package edu.cit.Abriz.LabadaGo.orders;

import java.time.LocalDate;
import java.time.LocalDateTime;

// what we send back to the frontend for a single order — mirrors the
// Order entity but keeps the API response shape independent of the
// database model, in case the entity needs to change later
public class OrderResponse {

    private Long orderId;
    private Long customerId;
    private String customerName;
    private String serviceType;
    private String pickupType;
    private LocalDate pickupDate;
    private String notes;
    private Double estimatedPrice;
    private String status;
    private LocalDateTime createdAt;

    public OrderResponse() {
    }

    public static OrderResponse fromEntity(Order order) {
        OrderResponse response = new OrderResponse();
        response.orderId = order.getOrderId();
        response.customerId = order.getCustomerId();
        response.customerName = order.getCustomerName();
        response.serviceType = order.getServiceType();
        response.pickupType = order.getPickupType();
        response.pickupDate = order.getPickupDate();
        response.notes = order.getNotes();
        response.estimatedPrice = order.getEstimatedPrice();
        response.status = order.getStatus();
        response.createdAt = order.getCreatedAt();
        return response;
    }

    public Long getOrderId() {
        return orderId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getServiceType() {
        return serviceType;
    }

    public String getPickupType() {
        return pickupType;
    }

    public LocalDate getPickupDate() {
        return pickupDate;
    }

    public String getNotes() {
        return notes;
    }

    public Double getEstimatedPrice() {
        return estimatedPrice;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
