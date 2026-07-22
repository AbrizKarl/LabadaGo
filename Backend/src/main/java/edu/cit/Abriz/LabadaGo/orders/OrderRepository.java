package edu.cit.Abriz.LabadaGo.orders;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // a customer's own orders, most recent first
    List<Order> findByCustomerIdOrderByCreatedAtDesc(Long customerId);

    // every order in the system, most recent first — used by staff
    List<Order> findAllByOrderByCreatedAtDesc();

    // how many orders a given customer has placed — used on the Customers page
    long countByCustomerId(Long customerId);
}
