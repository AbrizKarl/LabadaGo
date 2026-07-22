package edu.cit.Abriz.LabadaGo.orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// all of these routes require a valid JWT (see SecurityConfig — only
// /api/auth/** is open). "Authentication authentication" below is filled
// in by JwtAuthFilter with the caller's email, so we always know who's
// making the request without trusting anything the client claims.
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // POST /api/orders — customer creates a new order
    @PostMapping
    public OrderResponse createOrder(Authentication authentication, @RequestBody CreateOrderRequest request) {
        return orderService.createOrder(authentication.getName(), request);
    }

    // GET /api/orders/mine — customer's own order history
    @GetMapping("/mine")
    public List<OrderResponse> getMyOrders(Authentication authentication) {
        return orderService.getOrdersForCustomer(authentication.getName());
    }

    // GET /api/orders — staff view of every order in the system
    @GetMapping
    public List<OrderResponse> getAllOrders(Authentication authentication) {
        return orderService.getAllOrders(authentication.getName());
    }

    // PUT /api/orders/{id}/status — staff move an order to its next status
    @PutMapping("/{id}/status")
    public OrderResponse updateStatus(
            Authentication authentication,
            @PathVariable("id") Long orderId,
            @RequestBody UpdateOrderStatusRequest request
    ) {
        return orderService.updateOrderStatus(authentication.getName(), orderId, request.getStatus());
    }
}
