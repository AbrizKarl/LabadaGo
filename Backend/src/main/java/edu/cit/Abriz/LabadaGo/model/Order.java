package edu.cit.Abriz.LabadaGo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

// this represents the "orders" table - tracks a customer's laundry order
// from creation through to completion (FR-003 Order Creation, FR-004 Order Tracking)
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @NotNull(message = "Customer is required")
    private Long customerId;

    // snapshot of the customer's name at order time, so staff can see who
    // placed the order without needing to join against the users table
    private String customerName;

    @NotBlank(message = "Service type is required")
    private String serviceType;

    @NotBlank(message = "Pickup type is required")
    private String pickupType; // "PICKUP" or "DROPOFF"

    @NotNull(message = "Pickup date is required")
    private LocalDate pickupDate;

    private String notes;

    private Double estimatedPrice;

    // PENDING -> IN_PROGRESS -> READY -> COMPLETED
    private String status;

    private LocalDateTime createdAt;

    public Order() {
    }

    public Order(Long customerId, String customerName, String serviceType, String pickupType,
                 LocalDate pickupDate, String notes, Double estimatedPrice) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.serviceType = serviceType;
        this.pickupType = pickupType;
        this.pickupDate = pickupDate;
        this.notes = notes;
        this.estimatedPrice = estimatedPrice;
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }

    // getters and setters below

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getPickupType() {
        return pickupType;
    }

    public void setPickupType(String pickupType) {
        this.pickupType = pickupType;
    }

    public LocalDate getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Double getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(Double estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
