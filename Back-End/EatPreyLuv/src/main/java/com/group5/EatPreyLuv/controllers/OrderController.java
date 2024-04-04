package com.group5.EatPreyLuv.controllers;

import com.group5.EatPreyLuv.Models.*;
import com.group5.EatPreyLuv.repo.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/orders")
@CrossOrigin("http://localhost:3000")
public class OrderController{

    private OrderRepository orderRepository;

    private CartItemRepository cartItemRepository;

    public OrderController(OrderRepository orderRepository, CartItemRepository cartItemRepository) {this.orderRepository= orderRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @GetMapping(value = "/all")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @GetMapping(value = "/get/{id}")
    public Optional<Order> getOrder(@PathVariable Long id) {
        return orderRepository.findById(id);
    }
    @GetMapping(value = "/status/{status}")
    public List<Order> getStatus(@PathVariable("status") String status){
        return orderRepository.findByOrderStatus(status);
    }
    @GetMapping(value = "/customer/{customer_id}")
    public List<Order> getCustomer(@PathVariable("customer_id") Long customer_id){
        return orderRepository.findByCustomerId(customer_id);
    }
    @GetMapping(value = "/customer-status/{customer_id}/{status}")
    public List<Order> getCustomerStatus(@PathVariable("customer_id") Long customer_id, @PathVariable("status") String status){
        return orderRepository.findByCustomerIdAndOrderStatus(customer_id, status);
    }


    @PostMapping(value = "/placeOrder")
    public ResponseEntity<Order> createOrder(@RequestBody PlaceOrderRequest request) {
        List<CartItem> cartItems = request.getCartItems();
        double discountPercent = request.getDiscountPercent();
        // Create a new Order object
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("Pending");
        order.setShipAddress(cartItems.get(0).getCustomer().getAddress() + ", " + cartItems.get(0).getCustomer().getCity() + ", " + cartItems.get(0).getCustomer().getState() + " " + cartItems.get(0).getCustomer().getZip());
        order.setCustomer(cartItems.get(0).getCustomer());
        order.setShippedDate(LocalDateTime.now().plusDays(5));
        order.setPrice(BigDecimal.valueOf(0));

        // Save the order to the database
        Order createdOrder = orderRepository.save(order);
        BigDecimal totalPrice = BigDecimal.valueOf(0);

        // Loop through the CartItems and convert them to OrderItems
        for (CartItem cartItem : cartItems) {
            totalPrice = totalPrice.add(cartItem.getItem().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            OrderItem orderItem = new OrderItem();
            // Set properties of the OrderItem object based on the CartItem object
            orderItem.setItem(cartItem.getItem());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setOrder(createdOrder);
            // Add the OrderItem to the Order object

            order.getOrderItems().add(orderItem);
        }
        //Calculate tax
        totalPrice = totalPrice.add(BigDecimal.valueOf(0.0825).multiply(totalPrice));
        discountPercent = discountPercent/100;
        //Calculate discount
        totalPrice = totalPrice.subtract(BigDecimal.valueOf(discountPercent).multiply(totalPrice));
        order.setPrice(totalPrice);

        cartItemRepository.deleteByCustomerId(cartItems.get(0).getCustomer().getId());

        // Return the created order to the frontend
        return ResponseEntity.ok().body(createdOrder);
    }

    private void sortOrdersByOrderDate(List<Order> orders) {
        orders.sort(Comparator.comparing(Order::getOrderDate));
    }
    @GetMapping(value = "/orderDate")
    public List<Order> getOrdersByDate() {
        List<Order> orders = orderRepository.findAll();
        sortOrdersByOrderDate(orders);
        return orders;
    }

    private void sortOrdersByShippedDate(List<Order> orders) {
        orders.sort(Comparator.comparing(Order::getShippedDate));
    }
    @GetMapping(value = "/shippedDate")
    public List<Order> getOrdersByShippedDate() {
        List<Order> orders = orderRepository.findAll();
        sortOrdersByShippedDate(orders);
        return orders;
    }

    private void sortOrdersByPrice(List<Order> orders) { orders.sort(Comparator.comparing(Order::getPrice)); }
    @GetMapping(value = "/price")
    public List<Order> getOrdersByPrice() {
        List<Order> orders = orderRepository.findAll();
        sortOrdersByPrice(orders);
        return orders;
    }

    private void sortOrdersByCustomer(List<Order> orders) { orders.sort(Comparator.comparing(o -> o.getCustomer().getId())); }
    @GetMapping(value = "/customer")
    public List<Order> getOrdersByCustomer() {
        List<Order> orders = orderRepository.findAll();
        sortOrdersByCustomer(orders);
        return orders;
    }
    @PostMapping("/add")
    public Order newOrder(@RequestBody Order newOrder) {
        return orderRepository.save(newOrder);
    }

    @PutMapping("/update/{id}")
    public Optional<Order> updateOrder(@RequestBody Order newOrder, @PathVariable Long id) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setOrderStatus(newOrder.getOrderStatus());
                    order.setShippedDate(newOrder.getShippedDate());
                    order.setPrice(newOrder.getPrice());
                    order.setOrderDate(newOrder.getOrderDate());
                    order.setCustomer(newOrder.getCustomer());
                    order.setShipAddress(newOrder.getShipAddress());
                    return orderRepository.save(order);
                });
    }

    @DeleteMapping("/delete/{id}")
    void deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }


}
