package com.sy1.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sy1.dto.Post;
import com.sy1.entity.PostDto;
import com.sy1.repository.PostRepository;
import com.sy1.service.PostService;
import org.json.simple.JSONObject;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @PutMapping("post/register") // 기존 데이터에 덮어쓰기 때문에 update와 로직 동일
    public String registerPost(@RequestBody PostDto postDto){
        ModelMapper modelMapper = new ModelMapper();

        Post post = modelMapper.map(postDto, Post.class);
        postService.updatePost(post);


        return "success";
    }

    @PutMapping("post/update")
    public String updatePost(@RequestBody PostDto postDto){
        ModelMapper modelMapper = new ModelMapper();
        Post post = modelMapper.map(postDto, Post.class);
        postService.updatePost(post);

        return "success";
    }

    @GetMapping("post/getPostOfDay")
    public String getPost(@RequestParam("id") String id_){
        long id = Long.parseLong(id_);
        Post post = postService.getPost(id);

        Gson gson = new Gson();
        String jsonString = gson.toJson(post);


        return jsonString;

    }
    @GetMapping("post/getPostOfMonth")
    public String getPosts(@RequestParam("month") String month_) throws JsonProcessingException {
        long month = Long.parseLong(month_);
        List<Post> posts = postRepository.findAll();
        List<Post> jsonPost = new ArrayList<>();

        
        for (Post post: posts){
            long m = Long.parseLong(post.getDate().format(DateTimeFormatter.ofPattern("MM")));

            if ( m == month){
                jsonPost.add(post);

            }
        }


        Gson gson = new Gson();

        String s = gson.toJson(jsonPost);

        return s;

    }
    @DeleteMapping("post/delete")
    public String deletePost(@RequestParam("id") String id_) {
        postService.deletePost(Long.parseLong(id_));

        return "success";
    }
}

