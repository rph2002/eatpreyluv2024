package com.group5.EatPreyLuv.Models;

import java.util.List;

public class PlaceOrderRequest {
    private List<CartItem> cartItems;

    private Double discountPercent;

    public PlaceOrderRequest() {
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public Double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
    }
}
