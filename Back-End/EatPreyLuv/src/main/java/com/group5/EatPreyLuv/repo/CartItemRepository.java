package com.group5.EatPreyLuv.repo;

import com.group5.EatPreyLuv.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{
    List<CartItem> findByCustomerId(Long customer_id);
    @Transactional
    void deleteByCustomerId(Long customer_id);


}