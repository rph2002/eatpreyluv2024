package com.group5.EatPreyLuv.service;

import com.group5.EatPreyLuv.Models.DiscountCode;
import com.group5.EatPreyLuv.repo.DiscountCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiscountCodeService {
    @Autowired
    private DiscountCodeRepository discountCodeRepository;

    public DiscountCodeService(DiscountCodeRepository discountCodeRepository) {
        this.discountCodeRepository = discountCodeRepository;
    }

    public boolean validateDiscountCode(String code){
        DiscountCode discountCode = discountCodeRepository.findByCode(code);
        return discountCode != null;
    }
}
