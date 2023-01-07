package com.sy1.controller;

import com.sy1.dto.TokenInfo;
import com.sy1.dto.MemberDTO;
import com.sy1.entity.Member;
import com.sy1.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final ModelMapper  modelMapper;

    @PostMapping("user/signup")
    public String signup(@RequestBody MemberDTO memberDTO)
    {

        Member member = modelMapper.map(memberDTO, Member.class);
        return memberService.signup(member);
    }
    @PostMapping("user/login")
    public TokenInfo login(@RequestBody MemberDTO memberDto) {
        String memberId = memberDto.getEmail();
        String password = memberDto.getPassword();
        TokenInfo tokenInfo = memberService.login(memberId, password);
        return tokenInfo;
    }
    @PostMapping("/user/test")
    public String test(){
        return "success";
    }
}
