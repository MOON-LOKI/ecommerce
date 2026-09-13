package com.example.e_commerce.service.impl;

import com.example.e_commerce.dto.ApiResponse;
import com.example.e_commerce.dto.LoginRequest;
import com.example.e_commerce.dto.SignupRequest;
import com.example.e_commerce.entity.User;
import com.example.e_commerce.repository.UserRepository;
import com.example.e_commerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public ApiResponse registerUser(SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return new ApiResponse(false, "Passwords do not match!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse(false, "Email is already registered!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        // In a production app, always encrypt this using BCryptPasswordEncoder
        user.setPassword(request.getPassword());

        userRepository.save(user);
        return new ApiResponse(true, "User registered successfully!");
    }

    @Override
    public ApiResponse loginUser(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(request.getPassword())) {
                return new ApiResponse(true, "Login successful!");
            }
        }
        return new ApiResponse(false, "Invalid email or password!");
    }
}