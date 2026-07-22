package edu.cit.Abriz.LabadaGo.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// JpaRepository already gives us save(), findAll(), findById(), etc for free
public interface UserRepository extends JpaRepository<User, Long> {

    // spring boot builds this query automatically just from the method name
    User findByEmail(String email);

    // used to check if an email is already taken (BR-008: emails must be unique)
    boolean existsByEmail(String email);

    // used by the staff-facing Customers page to list everyone with the
    // CUSTOMER role, without pulling in staff accounts
    List<User> findByRoleOrderByNameAsc(String role);
}
