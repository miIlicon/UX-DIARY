package com.sy1.controller;

import com.sy1.dto.TokenInfo;
import com.sy1.dto.UserDTO;
import com.sy1.entity.User;
import com.sy1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ModelMapper  modelMapper;

    @PostMapping("user/signup")
    public String signup(@RequestBody UserDTO userDTO)
    {
        User user = modelMapper.map(userDTO, User.class);
        return userService.signup(user);
    }
    @PostMapping("user/login")
    public TokenInfo login(@RequestBody UserDTO userDto) {
        String memberId = userDto.getEmail();
        String password = userDto.getPassword();
        TokenInfo tokenInfo = userService.login(memberId, password);
        return tokenInfo;
    }
}
