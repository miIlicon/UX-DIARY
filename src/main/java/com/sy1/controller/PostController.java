package com.sy1.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sy1.dto.Post;
import com.sy1.entity.PostDto;
import com.sy1.repository.PostRepository;
import com.sy1.service.PostService;
import org.json.simple.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @PostMapping("post/register")
    public String registerPost(@RequestBody PostDto postDto){
        ModelMapper modelMapper = new ModelMapper();
        Post post = modelMapper.map(postDto, Post.class);
        postService.createPost(post);

        return "success";
    }

    @PutMapping("post/update")
    public String updatePost(@RequestBody PostDto postDto){
        ModelMapper modelMapper = new ModelMapper();
        Post post = modelMapper.map(postDto, Post.class);
        postService.updatePost(post);

        return "success";
    }

    @GetMapping("post/get")
    public String getPost(@RequestParam("id") String id_){
        long id = Long.parseLong(id_);
        Post post = Post.class.cast(postRepository.findById(id));
        //ModelMapper modelMapper = new ModelMapper();
        //JsonObject json = modelMapper.map(post, JsonObject.class); // json매핑 테스트
        //System.out.println(json);

        JsonObject obj = new JsonObject();
        obj.addProperty("id", post.getId());
        obj.addProperty("title", post.getTitle());
        obj.addProperty("content", post.getContent());
        obj.addProperty("feeling", post.getFeeling());
        obj.addProperty("date", post.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd ")));
        obj.addProperty("state",post.getState());

        return obj.toString();

    }
    @GetMapping("post/getAll")
    public String getPosts(){
        List<Post> posts = postRepository.findAll();

/*        ModelMapper modelMapper = new ModelMapper();
        JsonArray ja = new JsonArray();
        for (Post post: posts) {
            JsonObject jsonObject = modelMapper.map(post, JsonObject.class); // json매핑 테스트
            ja.add(jsonObject);
        }
        System.out.println(ja.toString());
        */


        JsonArray ja = new JsonArray();

        for (Post post: posts) {
            JsonObject obj = new JsonObject();
            obj.addProperty("id", post.getId());
            obj.addProperty("title", post.getTitle());
            obj.addProperty("content", post.getContent());
            obj.addProperty("feeling", post.getFeeling());
            obj.addProperty("date", post.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd ")));
            obj.addProperty("state", post.getState());
            ja.add(obj);
        }
        return ja.toString();

    }
    @DeleteMapping("post/delete")
    public String deletePost(@RequestParam("id") String id_) {
        postService.deletePost(Long.parseLong(id_));

        return "success";
    }
}

