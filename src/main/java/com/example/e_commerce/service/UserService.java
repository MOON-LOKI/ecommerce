package com.example.e_commerce.service;

import com.example.e_commerce.dto.LoginRequest;
import com.example.e_commerce.dto.SignupRequest;
import com.example.e_commerce.dto.ApiResponse;

public interface UserService {
    ApiResponse registerUser(SignupRequest request);
    ApiResponse loginUser(LoginRequest request);
}