package com.sy1.listener;

import com.sy1.dto.Post;
import com.sy1.repository.PostRepository;
import com.sy1.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostService postService;

    private boolean alreadySetup = false;
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if(alreadySetup){
            return;
        }

        setupData();
        alreadySetup = true;
    }

    private void setupData() {
        int year = 2022;
        for(int month = 1; month <= 12; month++){
            for (int day = 1; day <= getDate(year,month); day++){
                LocalDate localDate = LocalDate.of(year, month, day);
                createPostIfNotFound(false, localDate);
            }
        }

    }
    @Transactional
    public void createPostIfNotFound(final Boolean state, final LocalDate localDate) {
        Post post = Post.builder()
                .state(state)
                .date(localDate)
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
