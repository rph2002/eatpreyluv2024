package com.group5.EatPreyLuv.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "OrderItem")
public class OrderItem {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="item_id")
    private Item itemId;

    @ManyToOne
    @JoinColumn(name="order_id")
    private Order order;

    @Column(name="quantity", nullable = false)
    private Integer quantity;

    public OrderItem() {
    }

    public Long getId() {
        return id;
    }

    public Item getItem() {
        return itemId;
    }

    public void setItem(Item item) {
        this.itemId = item;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
