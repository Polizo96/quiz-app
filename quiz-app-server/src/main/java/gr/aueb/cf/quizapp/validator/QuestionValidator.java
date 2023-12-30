package gr.aueb.cf.quizapp.validator;

import gr.aueb.cf.quizapp.model.Question;

import java.util.HashMap;
import java.util.Map;

public class QuestionValidator {

    private QuestionValidator() {}

    public static Map<String, String> validate(Question question) {
        Map<String, String> errors = new HashMap<>();

        if (question.getQuestion().isEmpty()) errors.put("question", "empty");
        if (question.getChoices().isEmpty()) errors.put("choices", "empty");
        if (question.getCorrectAnswers().isEmpty()) errors.put("correctAnswers", "empty");

        return errors;
    }
}
