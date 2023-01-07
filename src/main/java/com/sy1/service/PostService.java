package com.sy1.service;

import com.sy1.entity.Member;
import com.sy1.entity.Post;

import java.util.List;

public interface PostService {
    Post getPost(long id);

    List<Post> getTodoPosts(Member member, int month);

    void createPost(Post post);

    void updatePost(Post post);

    void deletePost(long id);
}
