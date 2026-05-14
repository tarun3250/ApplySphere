package com.tarun.applysphere.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
