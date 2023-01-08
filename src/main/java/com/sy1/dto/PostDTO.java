package com.sy1.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sy1.entity.Member;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class PostDTO {

    private long id;

    private String title;

    private String content;

    private String Feeling;

    private Boolean state;

    private int month;

    private long memberId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
}
