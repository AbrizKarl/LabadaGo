package edu.cit.Abriz.LabadaGo.service;

import edu.cit.Abriz.LabadaGo.dto.CreateOrderRequest;
import edu.cit.Abriz.LabadaGo.dto.OrderResponse;
import edu.cit.Abriz.LabadaGo.model.Order;
import edu.cit.Abriz.LabadaGo.model.User;
import edu.cit.Abriz.LabadaGo.repository.OrderRepository;
import edu.cit.Abriz.LabadaGo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// handles order creation, listing, and status updates
// (FR-003 Order Creation, FR-004 Order Tracking, FR-005 Order Status Management)
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // server-side price list, in PHP — deliberately not trusted from the
    // client, so a customer can't submit a fake price for their order
    private static final Map<String, Double> SERVICE_PRICES = new HashMap<>();
    static {
        SERVICE_PRICES.put("Wash & Fold", 150.0);
        SERVICE_PRICES.put("Wash Only", 100.0);
        SERVICE_PRICES.put("Dry Clean", 250.0);
        SERVICE_PRICES.put("Iron Only", 80.0);
        SERVICE_PRICES.put("Express", 300.0);
    }

    private static final List<String> VALID_STATUSES =
            List.of("PENDING", "IN_PROGRESS", "READY", "COMPLETED");

    private static final List<String> VALID_PICKUP_TYPES = List.of("PICKUP", "DROPOFF");

    // a customer creates a new order — BR: only accounts with the
    // CUSTOMER role are allowed to place orders
    public OrderResponse createOrder(String customerEmail, CreateOrderRequest request) {
        User customer = userRepository.findByEmail(customerEmail);
        if (customer == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account not found.");
        }
        if (!"CUSTOMER".equals(customer.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only customer accounts can place orders.");
        }

        if (request.getServiceType() == null || !SERVICE_PRICES.containsKey(request.getServiceType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Please choose a valid service type.");
        }
        if (request.getPickupType() == null || !VALID_PICKUP_TYPES.contains(request.getPickupType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Please choose pickup or drop-off.");
        }
        if (request.getPickupDate() == null || request.getPickupDate().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please choose a pickup date.");
        }

        LocalDate pickupDate;
        try {
            pickupDate = LocalDate.parse(request.getPickupDate());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pickup date is not valid.");
        }
        if (pickupDate.isBefore(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Pickup date can't be in the past.");
        }

        double price = SERVICE_PRICES.get(request.getServiceType());

        Order order = new Order(
                customer.getUserId(),
                customer.getName(),
                request.getServiceType(),
                request.getPickupType(),
                pickupDate,
                request.getNotes(),
                price
        );

        Order saved = orderRepository.save(order);
        return OrderResponse.fromEntity(saved);
    }

    // a customer's own order history
    public List<OrderResponse> getOrdersForCustomer(String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail);
        if (customer == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account not found.");
        }
        return orderRepository.findByCustomerIdOrderByCreatedAtDesc(customer.getUserId())
                .stream()
                .map(OrderResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // every order in the system — staff only
    public List<OrderResponse> getAllOrders(String requesterEmail) {
        User requester = userRepository.findByEmail(requesterEmail);
        if (requester == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account not found.");
        }
        if (!"STAFF".equals(requester.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only shop staff can view all orders.");
        }
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(OrderResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // staff move an order forward through its lifecycle
    public OrderResponse updateOrderStatus(String requesterEmail, Long orderId, String newStatus) {
        User requester = userRepository.findByEmail(requesterEmail);
        if (requester == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account not found.");
        }
        if (!"STAFF".equals(requester.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only shop staff can update order status.");
        }
        if (newStatus == null || !VALID_STATUSES.contains(newStatus)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Status must be one of: " + String.join(", ", VALID_STATUSES));
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found."));

        order.setStatus(newStatus);
        Order saved = orderRepository.save(order);
        return OrderResponse.fromEntity(saved);
    }
}
