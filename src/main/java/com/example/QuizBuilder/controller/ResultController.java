package com.example.QuizBuilder.controller;

import com.example.QuizBuilder.dto.AnswerDTO;
import com.example.QuizBuilder.dto.AnswerSubmissionDTO;
import com.example.QuizBuilder.dto.ResultResponseDTO;
import com.example.QuizBuilder.model.Quiz;
import com.example.QuizBuilder.model.Result;
import com.example.QuizBuilder.service.QuizService;
import com.example.QuizBuilder.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/result")
public class ResultController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private ResultService resultService;



    @GetMapping("/user/{userId}")
    public List<Result> getResultsByUser(@PathVariable Long userId) {
        return resultService.getResultsByUserId(userId);
    }

    @GetMapping("/quiz/{quizId}")
    public List<Result> getResultsByQuiz(@PathVariable Long quizId) {
        return resultService.getResultsByQuizId(quizId);
    }

    @GetMapping("/history/{userId}/{quizId}")
    public List<Result> getUserQuizHistory(@PathVariable Long userId, @PathVariable Long quizId) {
        return resultService.getUserQuizHistory(userId, quizId);
    }

    // For detailed result saving
    @PostMapping("/submit-answers")
    public ResponseEntity<Result> submitQuiz(@RequestBody AnswerSubmissionDTO submissionDTO) {
        Result result = resultService.processSubmission(submissionDTO);
        return ResponseEntity.ok(result);
    }

    // For summary result response
    @PostMapping("/submit-summary")
    public ResultResponseDTO submitAnswers(@RequestBody AnswerDTO dto) {
        Quiz quiz = quizService.getQuizById(dto.getQuizId());
        Result result = resultService.calculateAndSaveResult(dto, quiz);

        ResultResponseDTO responseDTO = new ResultResponseDTO();
        responseDTO.setUserId(result.getUserId());
        responseDTO.setScore(result.getScore());
        responseDTO.setTotalQuestions(result.getTotalQuestions());
        responseDTO.setTakenAt(result.getTakenAt());
        responseDTO.setQuizTitle(quiz.getTitle());
        responseDTO.setQuizDescription(quiz.getDescription());

        return responseDTO;
    }

}
