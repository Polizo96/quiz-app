package gr.aueb.cf.quizapp.controller;

import gr.aueb.cf.quizapp.model.Question;
import gr.aueb.cf.quizapp.service.IQuestionService;
import gr.aueb.cf.quizapp.service.exceptions.QuestionNotFoundException;
import gr.aueb.cf.quizapp.validator.QuestionValidator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuestionController {
    private final IQuestionService questionService;

    @PostMapping("/create-new-question")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody Question question) {
        Map<String, String> errors = QuestionValidator.validate(question);
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }

        Question createdQuestion = questionService.insertQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
    }

    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) throws QuestionNotFoundException {
        Optional<Question> theQuestion = questionService.getQuestionById(id);
        if (theQuestion.isPresent()){
            return ResponseEntity.ok(theQuestion.get());
        } else {
            throw new QuestionNotFoundException("The question with " + id + "not found");
        }
    }

    @PutMapping("/question/{id}/update")
    public ResponseEntity<?> updateQuestion(
            @PathVariable Long id, @RequestBody Question question) throws QuestionNotFoundException {
        Map<String, String> errors = QuestionValidator.validate(question);
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }

        Question updatedQuestion = questionService.updateQuestion(id, question);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects() {
        List<String> subjects = questionService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/quiz/fetch-questions-for-user")
    public ResponseEntity<List<Question>> getQuestionsForUser(
            @RequestParam Integer numOfQuestions, @RequestParam String subject) {
        List<Question> allQuestions = questionService.getQuestionsForUser(numOfQuestions, subject);

        List<Question> mutableQuestions = new ArrayList<>(allQuestions);
        Collections.shuffle(mutableQuestions);

        int availableQuestions = Math.min(numOfQuestions, mutableQuestions.size());
        List<Question> randomQuestions = mutableQuestions.subList(0, availableQuestions);
        return ResponseEntity.ok(randomQuestions);
    }
}
