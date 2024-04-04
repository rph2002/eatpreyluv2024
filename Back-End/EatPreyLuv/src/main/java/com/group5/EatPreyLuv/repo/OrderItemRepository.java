package com.group5.EatPreyLuv.repo;

import com.group5.EatPreyLuv.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(Long order_id);
}