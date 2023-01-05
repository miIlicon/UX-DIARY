package com.sy1.service;

import com.sy1.dto.TokenInfo;
import com.sy1.entity.Member;

public interface UserService {


    String signup(Member member);
    TokenInfo login(String email, String password);
}
