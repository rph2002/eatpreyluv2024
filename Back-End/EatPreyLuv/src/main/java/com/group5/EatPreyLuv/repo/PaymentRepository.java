package com.group5.EatPreyLuv.repo;

import com.group5.EatPreyLuv.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}