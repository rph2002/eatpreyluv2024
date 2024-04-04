package com.group5.EatPreyLuv.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "DiscountCode")
public class DiscountCode{

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "discountCodeID", nullable= false)
    private Long discountCodeId;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name="discountPercent", nullable = false)
    private Double discountPercent;


    public DiscountCode() {
    }

    public Long getDiscountCodeId() {
        return discountCodeId;
    }

    public void setDiscountCodeId(Long discountCodeId) {
        this.discountCodeId = discountCodeId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
    }
}