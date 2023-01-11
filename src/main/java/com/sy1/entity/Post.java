package com.sy1.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@ToString(exclude = "member")
public class Post {
    @Id
    @GeneratedValue
    private long id;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private String feeling;

    @Column
    private Boolean state;

    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Column
    private int month;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    @JsonBackReference
    private Member member;



}
