package com.example.QuizBuilder.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ResultResponseDTO {
    private Long userId;
    private int score;
    private int totalQuestions;
    private LocalDateTime takenAt;
    private String quizTitle;
    private String quizDescription;
}
