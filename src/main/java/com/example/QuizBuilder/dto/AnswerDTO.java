package com.example.QuizBuilder.dto;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDTO {
    private Long quizId;
    private Long userId;
    private Map<Long, String> answers; // questionId -> selectedOption
}
