package com.group5.EatPreyLuv.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "Payment")
public class Payment{

    @Id
    @Column(name = "id", nullable= false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "cardType", nullable = false)
    private String cardType;

    @Column(name = "cardNumber")
    private String cardNumber;

    @Column(name = "expirationDate", nullable = false)
    private String expirationDate;

    @Column(name = "securityCode", nullable = false)
    private String securityCode;

    public Payment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public com.group5.EatPreyLuv.Models.Customer getCustomer() {
        return customer;
    }

    public void setCustomer(com.group5.EatPreyLuv.Models.Customer customer) {
        this.customer = customer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }
}
