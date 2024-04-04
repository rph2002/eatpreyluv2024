package com.group5.EatPreyLuv.controllers;

import com.group5.EatPreyLuv.Models.*;
import com.group5.EatPreyLuv.repo.*;
import com.group5.EatPreyLuv.service.DiscountCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/discountCodes")
@CrossOrigin("http://localhost:3000")
public class DiscountCodeController{


    private DiscountCodeRepository discountCodeRepository;
@Autowired
    private DiscountCodeService discountCodeService;

    public DiscountCodeController(DiscountCodeRepository discountCodeRepository) {this.discountCodeRepository= discountCodeRepository;}

    @GetMapping(value = "/all")
    public List<DiscountCode> getOrders() {
        return discountCodeRepository.findAll();
    }

    @PostMapping("/add")
    public DiscountCode newDiscountCode(@RequestBody DiscountCode newDiscountCode) {
        return discountCodeRepository.save(newDiscountCode);
    }

    @GetMapping("/get/{id}")
    public Optional<DiscountCode> getId(@PathVariable("id") final Long id) {
        return discountCodeRepository.findById(id);
    }

    @GetMapping("/getByCode/{code}")
    public ResponseEntity<Double> getCode(@PathVariable("code") final String code) {

        boolean isValid = discountCodeService.validateDiscountCode(code);

        if (isValid) {
            return ResponseEntity.ok(discountCodeRepository.findByCode(code).getDiscountPercent());
        } else {
            return ResponseEntity.ok(0.0);
        }

    }
    @PutMapping("/update/{id}")
    public Optional<DiscountCode> updateOrder(@RequestBody DiscountCode newDiscountCode, @PathVariable Long id) {
        return discountCodeRepository.findById(id)
                .map(discountCode -> {
                    discountCode.setCode(newDiscountCode.getCode());
                    discountCode.setDiscountPercent(newDiscountCode.getDiscountPercent());
                    return discountCodeRepository.save(discountCode);
                });
    }

    @DeleteMapping("/delete/{id}")
    void deleteDiscountCode(@PathVariable Long id) {
        discountCodeRepository.deleteById(id);
    }
}