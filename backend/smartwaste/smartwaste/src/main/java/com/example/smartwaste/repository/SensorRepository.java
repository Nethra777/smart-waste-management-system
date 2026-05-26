package com.example.smartwaste.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.smartwaste.model.SensorData;

public interface SensorRepository
        extends MongoRepository<SensorData, String> {

}
