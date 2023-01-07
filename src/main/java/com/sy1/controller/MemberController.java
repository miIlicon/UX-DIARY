package com.sy1.controller;

import com.sy1.dto.TokenInfo;
import com.sy1.dto.MemberDTO;
import com.sy1.entity.Member;
import com.sy1.repository.MemberRepository;
import com.sy1.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final ModelMapper  modelMapper;
    private final MemberRepository memberRepository;

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
    @GetMapping("user/name")
    public String getUserName(){
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        Member member = memberRepository.findByEmail(name).orElse(null);
        return member.getName();
    }

    @PostMapping("/user/test")
    public String test(){
        return "success";
    }
}
