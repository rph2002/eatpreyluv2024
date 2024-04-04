package com.group5.EatPreyLuv.controllers;

import com.group5.EatPreyLuv.Models.*;
import com.group5.EatPreyLuv.repo.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/orderItems")
@CrossOrigin("http://localhost:3000")
public class OrderItemController{

    private OrderItemRepository orderItemRepository;

    public OrderItemController(OrderItemRepository orderItemRepository) {this.orderItemRepository= orderItemRepository;}

    @GetMapping(value = "/all")
    public List<OrderItem> getOrderItems() {
        return orderItemRepository.findAll();
    }

    @GetMapping(value = "/order/{order_id}")
    public List<OrderItem> getOrderItems(@PathVariable("order_id") final Long order_id) {
        return orderItemRepository.findByOrderId(order_id);
    }

    @PostMapping("/add")
    public OrderItem newOrder(@RequestBody OrderItem newOrderItem) {
        return orderItemRepository.save(newOrderItem);
    }

    @PutMapping("/update/{id}")
    public Optional<OrderItem> updateOrder(@RequestBody OrderItem newOrderItem, @PathVariable Long id) {
        return orderItemRepository.findById(id)
                .map(orderItem -> {
                    orderItem.setQuantity(newOrderItem.getQuantity());
                    return orderItemRepository.save(orderItem);
                });
    }

    @DeleteMapping("/delete/{id}")
    void deleteOrderItem(@PathVariable Long id) {
        orderItemRepository.deleteById(id);
    }
}