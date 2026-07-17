package edu.cit.Abriz.LabadaGo.dto;

// what the frontend sends when a customer submits the "New Order" form
public class CreateOrderRequest {

    private String serviceType;
    private String pickupType;
    private String pickupDate; // received as "YYYY-MM-DD", parsed in the service layer
    private String notes;

    public CreateOrderRequest() {
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

    public String getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(String pickupDate) {
        this.pickupDate = pickupDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
