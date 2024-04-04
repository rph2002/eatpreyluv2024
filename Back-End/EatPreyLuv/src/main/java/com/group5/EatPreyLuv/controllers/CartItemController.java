package com.group5.EatPreyLuv.controllers;

import com.group5.EatPreyLuv.repo.*;
import com.group5.EatPreyLuv.Models.*;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/cartItems")
@CrossOrigin("http://localhost:3000")
public class CartItemController {

    private CartItemRepository cartItemRepository;

    public CartItemController(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @GetMapping(value = "/all")
    public List<CartItem> getCartItems() {
        return cartItemRepository.findAll();
    }

    @GetMapping(value = "/{customer_id}")
    public List<CartItem> getCartItemByCustomerId(@PathVariable Long customer_id) {
        return cartItemRepository.findByCustomerId(customer_id);
    }

    @GetMapping(value = "/exists/{customer_id}")
    public boolean itemExists(@PathVariable Long customer_id, @RequestParam("id") Long itemId) throws UnsupportedEncodingException {
        // Properly decode the itemId value before using it in the logic
        //String decodedItemId = URLDecoder.decode(itemId, "UTF-8");
        for (CartItem i : cartItemRepository.findByCustomerId(customer_id))
            if(Objects.equals(i.getItem().getId(), itemId))
                return true;
        return false;
    }
    @PostMapping("/add")
    public CartItem newCartItem(@RequestBody CartItem newCartItem) {
        return cartItemRepository.save(newCartItem);
    }
    @PutMapping("/update/{id}")
    public Optional<CartItem> updateCartItem(@RequestBody CartItem newCartItem, @PathVariable Long id) {
        return cartItemRepository.findById(id)
                .map(cartItem -> {
                    cartItem.setItem(newCartItem.getItem());
                    cartItem.setCustomer(newCartItem.getCustomer());
                    return cartItemRepository.save(cartItem);
                });
    }
    @PutMapping("update/quantity/set/{id}/{quantity}")
    public int updateQuantity(@PathVariable("id") final Long id, @PathVariable("quantity") int quantity) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(id);
        if(cartItemOptional.isEmpty()) return -1;
        CartItem cartItem = cartItemOptional.get();
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
        return cartItem.getQuantity();
    }
    @PutMapping("update/quantity/add/{id}/{quantity}")
    public int addQuantity(@PathVariable("id") final Long id, @PathVariable("quantity") int quantity) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(id);
        if(cartItemOptional.isEmpty()) return -1;
        CartItem cartItem = cartItemOptional.get();
        cartItem.setQuantity(quantity + cartItem.getQuantity());
        cartItemRepository.save(cartItem);
        return cartItem.getQuantity();
    }
    @DeleteMapping("/delete/{id}")
    void deleteCartItem(@PathVariable Long id) {
        cartItemRepository.deleteById(id);
    }
    @DeleteMapping(value = "/clear/{customer_id}")
    public void clearCart(@PathVariable Long customer_id){
        cartItemRepository.deleteByCustomerId(customer_id);
    }
}
