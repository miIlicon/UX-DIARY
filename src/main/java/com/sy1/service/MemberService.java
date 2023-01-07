package com.sy1.service;

import com.sy1.dto.TokenInfo;
import com.sy1.entity.Member;

public interface MemberService {


    String signup(Member member);
    TokenInfo login(String email, String password);

    void createMember(Member member);

}
