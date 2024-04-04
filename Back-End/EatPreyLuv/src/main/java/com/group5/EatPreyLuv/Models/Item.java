package com.group5.EatPreyLuv.Models;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "Item")
public class Item {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @Column(name = "serialNumber", nullable = false)
    private String serialNumber;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name =  "stock", nullable = false)
    private Integer stock;
    @Column(name = "imagePath", nullable = false)
    private String imagePath;
    @Column(name = "brandName", nullable = false)
    private String brandName;
    @Column(name = "animal", nullable = false)
    private String animal;
    public Item() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String itemDesc) {
        this.description = itemDesc;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getAnimal() { return animal; }

    public void setAnimal(String animal) { this.animal = animal; }
}