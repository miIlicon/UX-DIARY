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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    private final PostRepository postRepository;
    private final ModelMapper modelMapper;

    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;
    @PutMapping("post/register") // 기존 데이터에 덮어쓰기 때문에 update와 로직 동일
    public String registerPost(@RequestBody PostDTO postDTO) {


        postService.updatePost(postDTO);

        return "success";
    }

    @PutMapping("post/update")
    public String updatePost(@RequestBody PostDTO postDTO) {



        postService.updatePost(postDTO);

        return "success";
    }

    @GetMapping("post/getPostOfDay")
    public JSONObject getPost(@RequestParam("id") String id_) throws JsonProcessingException {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(name).orElse(null);

        long id = Long.parseLong(id_);
        Post post = postService.getPost(id);

        JSONObject obj = new JSONObject();
        obj.put("id", post.getId());
        obj.put("title", post.getTitle());
        obj.put("content", post.getContent());
        obj.put("feeling", post.getFeeling());
        obj.put("state", post.getState());
        obj.put("date", post.getDate());
        obj.put("month", post.getMonth());
        obj.put("memberId", post.getMember().getMemberId());


        return obj;

    }


    @GetMapping("post/getPostOfMonth")
    public JSONArray  getPostsByMemberIdAndMonth(@RequestParam("month") int month) throws JsonProcessingException {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        Member member = memberRepository.findByEmail(name).orElse(null);
        System.out.println(name);
        List<Post> posts = postService.getTodoPosts(member, month);




        JSONArray ja = new JSONArray();


        for (Post post : posts) {
            JSONObject obj = new JSONObject();
            obj.put("id", post.getId());
            obj.put("title", post.getTitle());
            obj.put("content", post.getContent());
            obj.put("feeling", post.getFeeling());
            obj.put("state", post.getState());
            obj.put("date", post.getDate());
            obj.put("month", post.getMonth());
            obj.put("memberId", post.getMember().getMemberId());
            ja.add(obj);
        }





        return ja;

    }

    @PutMapping("post/delete")
    public String deletePost(@RequestBody PostDTO postDTO) {

        postService.updatePost(postDTO);

        return "success";
    }
}
