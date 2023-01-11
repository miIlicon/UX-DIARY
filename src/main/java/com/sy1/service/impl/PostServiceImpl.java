package com.sy1.service.impl;

import com.sy1.dto.PostDTO;
import com.sy1.entity.Member;
import com.sy1.entity.Post;
import com.sy1.repository.PostRepository;
import com.sy1.repository.specification.PostSpecification;
import com.sy1.service.PostService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    @Override
    public List<Post> getTodoPosts(Member member, int month) {
        Specification<Post> spec = Specification.where(PostSpecification.equalMember(member));
        spec = spec.and(PostSpecification.equalMonth(month));

        return postRepository.findAll(spec);
    }
    @Transactional
    @Override
    public void createPost(Post post) {
        postRepository.save(post);
    }

    @Transactional
    @Override
    public void updatePost(PostDTO postDTO) {
        Post post = postRepository.findById(postDTO.getId()).orElse(null);

        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setState(postDTO.getState());
        post.setMonth(postDTO.getMonth());
        post.setDate(postDTO.getDate());
        post.setFeeling(postDTO.getFeeling());

        //postRepository.save(post);
    }

    @Transactional
    @Override
    public void deletePost(long id) {
        Post post = postRepository.findById(id).orElse(new Post());
        post.setState(false);
    }


}
