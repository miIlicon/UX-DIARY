package com.sy1.repository.specification;

import com.sy1.entity.Member;
import com.sy1.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.Month;

@RequiredArgsConstructor
public class PostSpecification{

    public static Specification<Post> equalMember(Member member){
        return new Specification<Post>() {
            @Override
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("member"), member);
            }
        };
    }

    public static Specification<Post> equalMonth(int month){
        return new Specification<Post>() {
            @Override
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("month"), month);
            }
        };
    }


}
