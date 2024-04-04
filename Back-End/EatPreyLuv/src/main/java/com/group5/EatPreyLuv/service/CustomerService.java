package com.group5.EatPreyLuv.service;

import com.group5.EatPreyLuv.Models.Customer;
import com.group5.EatPreyLuv.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    public boolean validateEmail(String email) {
        Customer customer = customerRepository.findByEmail(email);
        return customer != null;
    }
    public boolean validateEmailAndPassword(String email, String password) {
        Customer customer = customerRepository.findByEmailAndPassword(email, password);
        return customer != null; // If customer is not null, email and password exist together in the database
    }
}