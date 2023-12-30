package gr.aueb.cf.quizapp.service.exceptions;

import gr.aueb.cf.quizapp.model.Question;

public class QuestionNotFoundException extends Exception {

    public QuestionNotFoundException(Question question) {
        super("Teacher with id " + question.getId() + " does not exist");
    }

    public QuestionNotFoundException(String s) {
        super(s);
    }
}
