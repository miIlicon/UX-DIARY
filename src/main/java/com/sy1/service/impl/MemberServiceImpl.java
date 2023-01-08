package com.sy1.service.impl;


import com.sy1.dto.TokenInfo;
import com.sy1.entity.Member;
import com.sy1.entity.Post;
import com.sy1.provider.JwtTokenProvider;
import com.sy1.repository.MemberRepository;
import com.sy1.service.MemberService;
import com.sy1.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    private final PostService postService;

    @Override
    public String signup(Member member) {
        if (memberRepository.existsByEmail(member.getEmail()))
        {
            return "fail";
        }
        member.getRoles().add("USER");

        memberRepository.save(member);
        setupData(member);
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


    private void setupData(Member member) {
        ArrayList<String> roles = new ArrayList<>();

        int year = 2023;
        for(int month = 1; month <= 12; month++){
            for (int day = 1; day <= getDate(year,month); day++){
                LocalDate localDate = LocalDate.of(year, month, day);
                createPostIfNotFound(false, localDate, month, member);
                }
        }

    }
    @Transactional
    public void createPostIfNotFound(final Boolean state, final LocalDate localDate, final int month, final Member member) {
        Post post = Post.builder()
                .state(state)
                .date(localDate)
                .month(month)
                .member(member)
                .build();

        postService.createPost(post);
    }


    private static boolean isLeapYear(int year) { // 윤년 계산

        boolean leap = false;

        if((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
            leap = true;
        }
        return leap;
    }

    private static int getDate(int year, int month) { // 월별 일 수
        int tmp = 0;

        if(isLeapYear(year)) {

            switch(month) {
                case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                    tmp = 31;
                    break;
                case 4: case 6: case 9: case 11:
                    tmp = 30;
                    break;
                case 2:
                    tmp = 29;
                    break;
            }
        }else {
            if(month == 1 || month == 3 || month == 5 || month == 7 ||month == 8 || month == 10 || month == 12) {
                tmp = 31;
            } else if(month == 4 || month == 6 || month == 9 || month == 11) {
                tmp = 30;
            }else if (month == 2) {
                tmp = 28;
            }
        }
        return tmp;
    }
}
