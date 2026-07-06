package edu.cit.Abriz.LabadaGo.repository;

import edu.cit.Abriz.LabadaGo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository already gives us save(), findAll(), findById(), etc for free
public interface UserRepository extends JpaRepository<User, Long> {

    // spring boot builds this query automatically just from the method name
    User findByEmail(String email);

    // used to check if an email is already taken (BR-008: emails must be unique)
    boolean existsByEmail(String email);
}
