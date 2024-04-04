package com.group5.EatPreyLuv.controllers;

import com.group5.EatPreyLuv.Models.*;
import com.group5.EatPreyLuv.repo.*;
import com.group5.EatPreyLuv.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/customers")
@CrossOrigin("http://localhost:3000")
public class CustomerController{

    private CustomerRepository customerRepository;
    private CustomerService customerService;

    public CustomerController(CustomerRepository customerRepository, CustomerService customerService) {this.customerRepository= customerRepository;
        this.customerService = customerService;
    }
    @GetMapping(value = "/all")
    public List<Customer> getOrders() {
        return customerRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Optional<Customer> getId(@PathVariable("id") final Long id) {
        return customerRepository.findById(id);
    }

    @GetMapping("/getUser/{email}")
    public Optional<Customer> getEmail(@PathVariable("email") final String email) {
        return Optional.ofNullable(customerRepository.findByEmail(email));
    }
    @PostMapping("/add")
    public Customer newOrder(@RequestBody Customer newCustomer) {
        return customerRepository.save(newCustomer);
    }

    @PostMapping("/validateUser")
    public ResponseEntity<String> validateEmailAndPassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String password = requestBody.get("password");

        boolean isValid = customerService.validateEmailAndPassword(email, password);

        if (isValid) {
            return ResponseEntity.ok("Email and password are valid.");
        } else {
            return ResponseEntity.badRequest().body("Email and password do not exist together.");
        }
    }
    @PostMapping("/validateNewUser")
    public ResponseEntity<String> validateEmail(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");

        boolean isValid = customerService.validateEmail(email);

        if (isValid) {
            return ResponseEntity.ok("Email is valid!");
        } else {
            return ResponseEntity.badRequest().body("Email does not exist!");
        }
    }

    @PutMapping("/update/{id}")
    public Optional<Customer> updateOrder(@RequestBody Customer newCustomer , @PathVariable Long id) {
        return customerRepository.findById(id)
                .map(customer -> {
                    customer.setfName(newCustomer.getfName());
                    customer.setlName(newCustomer.getlName());
                    customer.setPassword(newCustomer.getPassword());
                    customer.setEmail(newCustomer.getEmail());
                    customer.setPhone(newCustomer.getPhone());
                    customer.setAddress(newCustomer.getAddress());
                    customer.setCity(newCustomer.getCity());
                    customer.setState(newCustomer.getState());
                    customer.setZip(newCustomer.getZip());
                    customer.setCountry(newCustomer.getCountry());
                    customer.setAdmin(newCustomer.isAdmin());
                    return customerRepository.save(customer);
                });
    }
    @DeleteMapping("/delete/{id}")
    void deleteCustomer(@PathVariable Long id) {
        customerRepository.deleteById(id);
    }

}
