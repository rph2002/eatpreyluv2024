package com.group5.EatPreyLuv.repo;

import com.group5.EatPreyLuv.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
    Customer findByEmailAndPassword(String email, String password);

    Customer findByEmail(String email);
}
