package edu.cit.Abriz.LabadaGo.customers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // GET /api/customers — staff-only list of every customer account
    @GetMapping
    public List<CustomerSummaryResponse> getAllCustomers(Authentication authentication) {
        return customerService.getAllCustomers(authentication.getName());
    }
}
