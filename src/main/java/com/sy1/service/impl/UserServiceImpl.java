package com.sy1.service.impl;


import com.sy1.dto.TokenInfo;
import com.sy1.entity.User;
import com.sy1.provider.JwtTokenProvider;
import com.sy1.repository.UserRepository;
import com.sy1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public String signup(User user) {
        if (userRepository.existsByEmail(user.getEmail()))
        {
            return "fail";
        }
        userRepository.save(user);
        return "success";
    }

    @Override
    public TokenInfo login(String email, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        Authentication authenticate = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authenticate);
        return tokenInfo;
    }
}
