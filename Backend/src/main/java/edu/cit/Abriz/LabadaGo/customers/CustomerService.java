package edu.cit.Abriz.LabadaGo.customers;

import edu.cit.Abriz.LabadaGo.orders.OrderRepository;
import edu.cit.Abriz.LabadaGo.users.User;
import edu.cit.Abriz.LabadaGo.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

// staff-only: lists every customer account along with how many orders
// they've placed (FR-006 Customer Management)
@Service
public class CustomerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<CustomerSummaryResponse> getAllCustomers(String requesterEmail) {
        User requester = userRepository.findByEmail(requesterEmail);
        if (requester == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account not found.");
        }
        if (!"STAFF".equals(requester.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only shop staff can view the customer list.");
        }

        return userRepository.findByRoleOrderByNameAsc("CUSTOMER")
                .stream()
                .map(customer -> new CustomerSummaryResponse(
                        customer.getUserId(),
                        customer.getName(),
                        customer.getEmail(),
                        orderRepository.countByCustomerId(customer.getUserId())
                ))
                .collect(Collectors.toList());
    }
}
