package com.sy1.service.impl;

import com.sy1.entity.Post;
import com.sy1.repository.PostRepository;
import com.sy1.service.PostService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {


    private final PostRepository postRepository;

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
        Post post = postRepository.findById(id).orElse(new Post());
        post.setState(false);
        postRepository.save(post);
    }
}
