package com.example.smartwaste.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.smartwaste.model.SensorData;
import com.example.smartwaste.repository.SensorRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SensorController {

    @Autowired
    private SensorRepository repository;

    // POST API
    @PostMapping("/bin-data")
    public String receiveData(@RequestBody SensorData data) {

        repository.save(data);

        return "Data Saved Successfully";
    }

    // GET API
    @GetMapping("/all-data")
    public List<SensorData> getAllData() {

        return repository.findAll();
    }
}