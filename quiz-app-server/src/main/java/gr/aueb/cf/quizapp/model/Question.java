package gr.aueb.cf.quizapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String question;

    @NotBlank
    private String subject;

    @NotBlank
    private String questionType;

    @NotEmpty
    @ElementCollection
    private List<String> choices;

    @NotEmpty
    @ElementCollection
    private List<String> correctAnswers;
}
