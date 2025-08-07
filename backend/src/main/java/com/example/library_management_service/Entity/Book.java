package com.example.library_management_service.Entity;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "book_image")
    private String book_image;
    @Column(name = "book_name")
    private String book_name;
    @Column(name = "description")
    private String description;
    @Column(name = "author")
    private String author;
    @Column(name = "category")
    private String category;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "is_hide")
    private Boolean is_hide = false;
}