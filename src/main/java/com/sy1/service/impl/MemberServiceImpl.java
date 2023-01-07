package com.sy1.service.impl;


import com.sy1.dto.TokenInfo;
import com.sy1.entity.Member;
import com.sy1.provider.JwtTokenProvider;
import com.sy1.repository.MemberRepository;
import com.sy1.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public String signup(Member member) {
        if (memberRepository.existsByEmail(member.getEmail()))
        {
            return "fail";
        }
        member.getRoles().add("USER");
        memberRepository.save(member);
        return "success";
    }
    public void createMember(Member member){
        memberRepository.save(member);
    }

    @Override
    public TokenInfo login(String email, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        // 인증객체 생성 (authenticated 값은 false)
        Authentication authenticate = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 실제 인증 과정으로 authenticate실행 시 CustomUserDetailsService의 loadByUserName실행
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authenticate);
        return tokenInfo;
    }
}
