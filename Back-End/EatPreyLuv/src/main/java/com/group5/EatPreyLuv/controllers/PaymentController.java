package com.group5.EatPreyLuv.controllers;

import com.group5.EatPreyLuv.Models.*;
import com.group5.EatPreyLuv.repo.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/payments")
@CrossOrigin("http://localhost:3000")
public class PaymentController{
    private PaymentRepository paymentRepository;

    public PaymentController(PaymentRepository paymentRepository) {this.paymentRepository= paymentRepository;}

    @GetMapping(value = "/all")
    public List<Payment> getOrderItems() {
        return paymentRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Optional<Payment> getId(@PathVariable("id") final Long id) {
        return paymentRepository.findById(id);
    }

    @PostMapping("/add")
    public Payment newPayment(@RequestBody Payment newPayment) {
        return paymentRepository.save(newPayment);
    }

    @PutMapping("/update/{id}")
    public Optional<Payment> updateOrder(@RequestBody Payment newPayment, @PathVariable Long id) {
        return paymentRepository.findById(id)
                .map(payment -> {
                    payment.setName(newPayment.getName());
                    payment.setCardType(newPayment.getCardType());
                    payment.setCardNumber(newPayment.getCardNumber());
                    payment.setExpirationDate(newPayment.getExpirationDate());
                    payment.setSecurityCode(newPayment.getSecurityCode());
                    return paymentRepository.save(payment);
                });
    }

    @DeleteMapping("/delete/{id}")
    void deletePayment(@PathVariable Long id) {
        paymentRepository.deleteById(id);
    }
}