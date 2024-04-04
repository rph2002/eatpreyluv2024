package com.group5.EatPreyLuv.repo;

import com.group5.EatPreyLuv.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>{
    List<Order> findByOrderStatus(String status);
    List<Order> findByCustomerId(Long customer_id);
    List<Order> findByCustomerIdAndOrderStatus(Long customer_id, String Status);
}