package com.example.QuizBuilder.controller;

import com.example.QuizBuilder.model.Question;
import com.example.QuizBuilder.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);
    }

    @GetMapping("/quiz/{quizId}")
    public List<Question> getQuestionsByQuiz(@PathVariable Long quizId) {
        return questionService.getQuestionsByQuizId(quizId);
    }
}
