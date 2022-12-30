package com.sy1.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
public class UserDTO {

    private long id;

    private String email;
    private String password;
    private String username;

}
