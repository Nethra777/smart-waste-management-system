package com.example.smartwaste.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "sensor_data")
public class SensorData {

    @Id
    private String id;

    private String binId;
    private int fillLevel;
    private String location;
    private int level;
    private int gas;
}