package com.example.QuizBuilder.controller;

import com.example.QuizBuilder.model.Quiz;
import com.example.QuizBuilder.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.createQuiz(quiz);
    }

    @GetMapping("/all")
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @GetMapping("/{id}")
    public Quiz getQuizById(@PathVariable Long id) {
        return quizService.getQuizById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public Quiz updateQuiz(@PathVariable Long id, @RequestBody Quiz updatedQuiz) {
        return quizService.updateQuiz(id, updatedQuiz);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public String deleteQuiz(@PathVariable Long id) {
        boolean deleted = quizService.deleteQuiz(id);
        if (deleted) {
            return "Quiz with ID " + id + " deleted successfully.";
        } else {
            return "Quiz not found.";
        }
    }
}
