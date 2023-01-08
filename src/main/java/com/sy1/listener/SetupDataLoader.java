package com.sy1.listener;

import com.sy1.entity.Member;
import com.sy1.entity.Post;
import com.sy1.repository.MemberRepository;
import com.sy1.repository.PostRepository;
import com.sy1.service.MemberService;
import com.sy1.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    private final PostRepository postRepository;
    private final PostService postService;

    private final MemberRepository memberRepository;

    private final MemberService memberService;

    private boolean alreadySetup = false;
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if(alreadySetup){
            return;
        }

        //setupData();
        alreadySetup = true;
    }

    private void setupData() {
        ArrayList<String> roles = new ArrayList<>();
        roles.add("USER");
        Member member1 = createMemberIfNotFound("gkfktkrh153@naver.com","seungyong", "1234", roles);
        Member member2 = createMemberIfNotFound("gkfktkrh155@naver.com", "seungyong","1234", roles);

        int year = 2023;
        for(int month = 1; month <= 12; month++){
            for (int day = 1; day <= getDate(year,month); day++){
                LocalDate localDate = LocalDate.of(year, month, day);
                createPostIfNotFound(false, localDate, month, member1);
                createPostIfNotFound(false, localDate, month, member2);
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
    @Transactional
    public Member createMemberIfNotFound(final String email, final String name, final String password, final List<String> roles) {

        Member member = Member.builder()
                .email(email)
                .name(name)
                .password(password)
                .roles(roles)
                .build();


        return memberRepository.save(member);

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
