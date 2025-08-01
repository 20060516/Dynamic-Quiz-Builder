package com.example.QuizBuilder.service;

import com.example.QuizBuilder.model.Quiz;
import com.example.QuizBuilder.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;
    public Quiz createQuiz(Quiz quiz) {
        // Set quiz reference in each question
        quiz.getQuestions().forEach(q -> q.setQuiz(quiz));
        return quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with ID: " + id));
    }

    public Quiz updateQuiz(Long id, Quiz updatedQuiz) {
        Quiz existingQuiz = quizRepository.findById(id).orElse(null);
        if (existingQuiz != null) {
            existingQuiz.setTitle(updatedQuiz.getTitle());
            existingQuiz.setDescription(updatedQuiz.getDescription());

            existingQuiz.getQuestions().clear();
            updatedQuiz.getQuestions().forEach(q -> q.setQuiz(existingQuiz));
            existingQuiz.setQuestions(updatedQuiz.getQuestions());

            return quizRepository.save(existingQuiz);
        } else {
            throw new RuntimeException("Quiz not found for update with ID: " + id);
        }
    }
    public boolean deleteQuiz(Long id) {
        if (quizRepository.existsById(id)) {
            quizRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
