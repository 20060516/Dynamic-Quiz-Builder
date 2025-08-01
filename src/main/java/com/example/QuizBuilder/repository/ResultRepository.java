package com.example.QuizBuilder.repository;

import com.example.QuizBuilder.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUserId(Long userId);
    List<Result> findByQuizId(Long quizId);
    List<Result> findByUserIdAndQuizId(Long userId, Long quizId);
}
