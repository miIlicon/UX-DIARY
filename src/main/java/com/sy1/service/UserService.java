package com.sy1.service;

import com.sy1.dto.TokenInfo;
import com.sy1.entity.User;

public interface UserService {


    String signup(User user);
    TokenInfo login(String email, String password);
}
