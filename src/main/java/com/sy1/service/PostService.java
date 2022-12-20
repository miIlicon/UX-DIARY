package com.sy1.service;

import com.sy1.dto.Post;

import java.util.List;

public interface PostService {
    Post getPost(long id);

    List<Post> getTodosPost();

    void createPost(Post post);

    void updatePost(Post post);

    void deletePost(long id);
}
