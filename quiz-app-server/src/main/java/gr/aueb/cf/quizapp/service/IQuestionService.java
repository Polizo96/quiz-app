package gr.aueb.cf.quizapp.service;

import gr.aueb.cf.quizapp.model.Question;
import gr.aueb.cf.quizapp.service.exceptions.QuestionNotFoundException;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;

public interface IQuestionService {

    Question insertQuestion(Question question);
    List<Question> getAllQuestions();
    Optional<Question> getQuestionById(Long id);
    List<String> getAllSubjects();
    Question updateQuestion(Long id, Question question) throws QuestionNotFoundException;
    void deleteQuestion(Long id);
    List<Question> getQuestionsForUser(Integer numOfQuestions, String subject);
}
