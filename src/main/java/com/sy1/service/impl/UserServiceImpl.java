package com.sy1.service.impl;


import com.sy1.entity.User;
import com.sy1.repository.UserRepository;
import com.sy1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public String signup(User user) {
        if (userRepository.existsByEmail(user.getEmail()))
        {
            return "fail";
        }
        userRepository.save(user);
        return "success";
    }
}
