package com.sy1.controller;

import com.sy1.service.EmailService;
import com.sy1.service.impl.EmailServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;
    @PostMapping("/email")
    public String sendEmail(@RequestBody Map<String, String> param) throws Exception {
        String email = param.get("email");
        return emailService.sendSimpleMessage(email);
    }

}
