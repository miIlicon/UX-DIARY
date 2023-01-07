package com.sy1.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sy1.entity.Member;
import com.sy1.entity.Post;
import com.sy1.dto.PostDTO;
import com.sy1.repository.MemberRepository;
import com.sy1.repository.PostRepository;
import com.sy1.repository.specification.PostSpecification;
import com.sy1.service.PostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    private final PostRepository postRepository;
    private final ModelMapper modelMapper;

    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;
    @PutMapping("post/register") // 기존 데이터에 덮어쓰기 때문에 update와 로직 동일
    public String registerPost(@RequestBody PostDTO postDto) {


        Post post = modelMapper.map(postDto, Post.class);
        postService.updatePost(post);

        return "success";
    }

    @PutMapping("post/update")
    public String updatePost(@RequestBody PostDTO postDto) {

        Post post = modelMapper.map(postDto, Post.class);
        postService.updatePost(post);

        return "success";
    }

    @GetMapping("post/getPostOfDay")
    public String getPost(@RequestParam("id") String id_) throws JsonProcessingException {
        long id = Long.parseLong(id_);
        Post post = postService.getPost(id);

        objectMapper.registerModule(new JavaTimeModule());
        String jsonString = objectMapper.writeValueAsString(post);

        return jsonString;

    }

    @GetMapping("post/getPostOfMonth")
    public String getPosts(@RequestParam("month") String month_) throws JsonProcessingException {

        long month = Long.parseLong(month_);
        List<Post> posts = postRepository.findAll();
        List<Post> jsonPost = new ArrayList<>();

        for (Post post : posts) {
            long m = Long.parseLong(post.getDate().format(DateTimeFormatter.ofPattern("MM")));
            System.out.println(m);
            if (m == month) {
                jsonPost.add(post);
            }
        }

        objectMapper.registerModule(new JavaTimeModule());
        String s = objectMapper.writeValueAsString(jsonPost);

        return s;

    }
    @GetMapping("post/ByMemberIdAndMonth")
    public String getPostsByMemberIdAndMonth(@RequestParam("id") String id, @RequestParam("month") int month) throws JsonProcessingException {
        long memberId = Long.parseLong(id);
        Member member = memberRepository.findById(memberId);

        List<Post> posts = postService.getTodosPost(member, month);


        List<Post> jsonPost = new ArrayList<>();

        for (Post post : posts) {
            System.out.println(post);

            jsonPost.add(post);

        }


        objectMapper.registerModule(new JavaTimeModule());
        String s = objectMapper.writeValueAsString(jsonPost);

        return s;

    }

    @DeleteMapping("post/delete")
    public String deletePost(@RequestParam("id") String id_) {
        postService.deletePost(Long.parseLong(id_));

        return "success";
    }
}
