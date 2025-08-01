package com.example.QuizBuilder.dto;

import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerSubmissionDTO {
    private Long quizId;
    private Long userId;
    private Map<Long, String> answers; // questionId -> selectedOption
}
