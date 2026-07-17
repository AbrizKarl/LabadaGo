package edu.cit.Abriz.LabadaGo.dto;

// what staff send when moving an order to its next status
// (e.g. PENDING -> IN_PROGRESS -> READY -> COMPLETED)
public class UpdateOrderStatusRequest {

    private String status;

    public UpdateOrderStatusRequest() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
