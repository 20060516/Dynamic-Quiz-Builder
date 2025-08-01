package com.example.QuizBuilder.repository;

import com.example.QuizBuilder.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

}

