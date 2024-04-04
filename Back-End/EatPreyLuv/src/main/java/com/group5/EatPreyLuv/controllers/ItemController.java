package com.group5.EatPreyLuv.controllers;

import com.group5.EatPreyLuv.repo.*;
import com.group5.EatPreyLuv.Models.*;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/items")
@CrossOrigin("http://localhost:3000")
public class ItemController{

    private ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping(value = "/all")
    public List<Item> getOrders() {
        return itemRepository.findAll();
    }

    private void sortItemsByAnimal(List<Item> items) { items.sort(Comparator.comparing(Item::getAnimal)); }
    @GetMapping(value = "/animal")
    public List<Item> getItemsByAnimal() {
        List<Item> items = itemRepository.findAll();
        sortItemsByAnimal(items);
        return items;
    }

    private void sortItemsByPrice(List<Item> items){ items.sort((o1, o2) -> o1.getPrice().subtract(o2.getPrice()).signum()); }
    @GetMapping(value = "/price")
    public List<Item> getItemsByPrice() {
        List<Item> items = itemRepository.findAll();
        sortItemsByPrice(items);
        return items;
    }
    private void sortItemsByStock(List<Item> items) { items.sort(Comparator.comparingInt(Item::getStock)); }
    @GetMapping(value = "/stock")
    public List<Item> getItemsByStock() {
        List<Item> items = itemRepository.findAll();
        sortItemsByStock(items);
        return items;
    }

    @GetMapping(value = "/animal-price")
    public List<Item> getItemsByAnimalAndPrice() {
        List<Item> items = itemRepository.findAll();
        sortItemsByPrice(items); //secondary sort goes first
        sortItemsByAnimal(items); //primary goes last
        return items;
    }

    @GetMapping(value = "/animal-stock")
    public List<Item> getItemsByAnimalAndStock() {
        List<Item> items = itemRepository.findAll();
        sortItemsByStock(items); //secondary sort goes first
        sortItemsByAnimal(items); //primary goes last
        return items;
    }

    @GetMapping("/{name}")
    public List<Item> getName(@PathVariable("name") final String name) {
        return itemRepository.findByName(name);
    }

    @GetMapping("/animal/{animal}")
    public List<Item> getAnimal(@PathVariable("animal") final String animal) {
        return itemRepository.findByAnimal(animal);
    }

    @GetMapping("/get/{id}")
    public Optional<Item> getId(@PathVariable("id") final Long id) {
        return itemRepository.findById(id);
    }

    @PostMapping("/add")
    public Item newItem(@RequestBody Item newItem) {
        return itemRepository.save(newItem);
    }

    @PutMapping("/update/{id}")
    public Optional<Item> updateItem(@RequestBody Item newItem, @PathVariable Long id) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setDescription(newItem.getDescription());
                    item.setName((newItem.getName()));
                    item.setPrice((newItem.getPrice()));
                    item.setStock((newItem.getStock()));
                    item.setImagePath((newItem.getImagePath()));
                    item.setSerialNumber((newItem.getSerialNumber()));
                    item.setBrandName((newItem.getBrandName()));
                    item.setAnimal((newItem.getAnimal()));
                    return itemRepository.save(item);
                });
    }

    @DeleteMapping("/delete/{id}")
    void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
    }

}

