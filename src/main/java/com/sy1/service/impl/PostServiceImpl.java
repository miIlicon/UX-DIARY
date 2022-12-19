package com.sy1.service.impl;

import com.sy1.dto.Post;
import com.sy1.repository.PostRepository;
import com.sy1.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;

import java.util.List;

public class PostServiceImpl implements PostService {

    @Autowired
    PostRepository postRepository;

    @Override
    public Post getPost(long id) {
        return postRepository.findById(id).orElse(new Post());
    }

    @Override
    public List<Post> getTodosPost() {
        return postRepository.findAll(Sort.by(Sort.Order.asc("id")));
    }

    @Override
    public void createPost(Post post) {
        postRepository.save(post);
    }

    @Override
    public void updatePost(Post post) {
        postRepository.save(post);
    }

    @Override
    public void deletePost(long id) {

    }
}
