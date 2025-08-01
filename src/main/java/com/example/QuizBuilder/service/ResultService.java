package com.example.QuizBuilder.service;

import com.example.QuizBuilder.dto.AnswerDTO;
import com.example.QuizBuilder.dto.AnswerSubmissionDTO;
import com.example.QuizBuilder.dto.ResultResponseDTO;
import com.example.QuizBuilder.model.*;
import com.example.QuizBuilder.repository.QuestionRepository;
import com.example.QuizBuilder.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.List;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Result saveResult(Result result) {
        result.setTakenAt(LocalDateTime.now());
        return resultRepository.save(result);
    }

    public List<Result> getResultsByUserId(Long userId) {
        return resultRepository.findByUserId(userId);
    }

    public List<Result> getResultsByQuizId(Long quizId) {
        return resultRepository.findByQuizId(quizId);
    }

    public List<Result> getUserQuizHistory(Long userId, Long quizId) {
        return resultRepository.findByUserIdAndQuizId(userId, quizId);
    }

    public Result calculateAndSaveResult(AnswerDTO dto, Quiz quiz) {
        int score = 0;

        for (Question question : quiz.getQuestions()) {
            String correctAnswer = question.getCorrectAnswer(); // From DB
            String userAnswer = dto.getAnswers().get(question.getId());

            if (correctAnswer != null && correctAnswer.equalsIgnoreCase(userAnswer)) {
                score++;
            }
        }

        Result result = new Result();
        result.setQuiz(quiz);
        result.setUserId(dto.getUserId());
        result.setScore(score);
        result.setTotalQuestions(quiz.getQuestions().size());

        return resultRepository.save(result);
    }
    public ResultResponseDTO convertToDTO(Result result) {
        ResultResponseDTO dto = new ResultResponseDTO();
        dto.setUserId(result.getUserId());
        dto.setScore(result.getScore());
        dto.setTotalQuestions(result.getTotalQuestions());
        dto.setTakenAt(result.getTakenAt());

        Quiz quiz = result.getQuiz();
        if (quiz != null) {
            dto.setQuizTitle(quiz.getTitle());
            dto.setQuizDescription(quiz.getDescription());
        }
        return dto;
    }
    public Result processSubmission(AnswerSubmissionDTO submissionDTO) {
        Result result = new Result();
        result.setScore(8);
        result.setTotalQuestions(submissionDTO.getAnswers().size());
        result.setTakenAt(java.time.LocalDateTime.now());
        return result;
    }

}
