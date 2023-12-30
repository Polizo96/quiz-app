import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import { createQuestion, getSubjects } from "../../../utils/QuizService"

const AddQuestion = () => {
	const [question, setQuestionText] = useState("")
	const [questionType, setQuestionType] = useState("single")
	const [choices, setChoices] = useState(["A."])
	const [correctAnswers, setCorrectAnswers] = useState([""])
	const [subject, setSubject] = useState("")
	const [newSubject, setNewSubject] = useState("")
	const [subjectOptions, setSubjectOptions] = useState([""])
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);


	useEffect(() => {
		fetchSubjects()
	}, [])

	const fetchSubjects = async () => {
		try {
			const subjectsData = await getSubjects()
			setSubjectOptions(subjectsData)
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddChoice = () => {
    if (choices.length === 0) {
        setChoices(["A."]);
    } else {
        const lastChoice = choices[choices.length - 1];
        if (!lastChoice || lastChoice.trim() !== "") {
            const newChoiceLetter = String.fromCharCode("A".charCodeAt(0) + choices.length);
            const newChoice = `${newChoiceLetter}.`;
            setChoices([...choices, newChoice]);
        }
    }
};

	const handleRemoveChoice = (index) => {
		setChoices(choices.filter((choice, i) => i !== index))
	}

	const handleChoiceChange = (index, value) => {
		setChoices(choices.map((choice, i) => (i === index ? value : choice)))
	}

	const handleCorrectAnswerChange = (index, value) => {
		setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
	}

	const handleAddCorrectAnswer = () => {
		setCorrectAnswers([...correctAnswers, ""])
	}

	const handleRemoveCorrectAnswer = (index) => {
		setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const result = {
				question,
				questionType,
				choices,
				correctAnswers: correctAnswers.map((answer) => {
					const choiceLetter = answer.charAt(0).toUpperCase()
					const choiceIndex = choiceLetter.charCodeAt(0) - 65
					return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null
				}),

				subject
			}

			const response = await createQuestion(result);

		if (response && response.success) {
			setSuccessMessage(response.message)
			setError(null)

			setTimeout(() => {
				setSuccessMessage(null);
			}, 3000);

			setQuestionText("")
			setQuestionType("single")
			setChoices(["A."])
			setCorrectAnswers([""])
			setSubject("")
		} else {
			setError(response.message || "An error occurred");
		}
		} catch (error) {
			setError(error.message);
			setSuccessMessage(null);
		}
	}

	const handleAddSubject = () => {
		if (newSubject.trim() !== "") {
			setSubject(newSubject.trim());
	
			setSubjectOptions((prevOptions) => {
				const updatedOptions = Array.isArray(prevOptions) ? [...prevOptions, newSubject.trim()] : [newSubject.trim()];
				return updatedOptions;
			});
	
			setNewSubject("");
		}
	};
	
	

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6  mt-5">
					<div className="card">
						<div className="card-header">
							<h5 className="card-title">Add New Questions</h5>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit} className="p-2">
								<div className="mb-3">
									<label htmlFor="subject" className="form-label text-info">
										Select a Subject
									</label>
									<select
										id="subject"
										value={subject}
										onChange={(e) => setSubject(e.target.value)}
										className="form-control">
										<option value="">Select subject</option>
										<option value={"New"}>Add New</option>
										{subjectOptions && subjectOptions.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
								</div>

								{subject === "New" && (
									<div className="mb-3">
										<label htmlFor="new-subject" className="form-label text-info">
											Add New Subject
										</label>
										<input
											type="text"
											id="new-subject"
											value={newSubject}
											onChange={(event) => setNewSubject(event.target.value)}
											className="form-control"
										/>
										<button
											type="button"
											onClick={handleAddSubject}
											className="btn btn-outline-primary mt-2">
											Add Subject
										</button>
									</div>
								)}
								<div className="mb-3">
									<label htmlFor="question-text" className="form-label text-info">
										Question
									</label>
									<textarea
										className="form-control"
										rows={4}
										value={question}
										onChange={(e) => setQuestionText(e.target.value)}></textarea>
								</div>
								<div className="mb-3">
									<label htmlFor="question-type" className="form-label text-info">
										Question type
									</label>
									<select
										id="question-type"
										value={questionType}
										onChange={(event) => setQuestionType(event.target.value)}
										className="form-control">
										<option value="single">Single Answer</option>
										<option value="multiple">Multiple Answer</option>
									</select>
								</div>
								<div className="mb-3">
									<label htmlFor="choices" className="form-label text-primary">
										Choices
									</label>
									{choices.map((choice, index) => (
										<div key={index} className="input-group mb-3">
											<input
												type="text"
												value={choice}
												onChange={(e) => handleChoiceChange(index, e.target.value)}
												className="form-control"
											/>
											<button
												type="button"
												onClick={() => handleRemoveChoice(index)}
												className="btn btn-outline-danger">
												Remove
											</button>
										</div>
									))}
									<button
										type="button"
										onClick={handleAddChoice}
										className="btn btn-outline-primary">
										Add Choice
									</button>
								</div>
								{questionType === "single" && (
									<div className="mb-3">
										<label htmlFor="answer" className="form-label text-success">
											Correct Answer
										</label>
										<input
											type="text"
											className="form-control"
											id="answer"
											value={correctAnswers[0]}
											onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
										/>
									</div>
								)}
								{questionType === "multiple" && (
									<div className="mb-3">
										<label htmlFor="answer" className="form-label text-success">
											Correct Answer(s)
										</label>
										{correctAnswers.map((answer, index) => (
											<div key={index} className="d-flex mb-2">
												<input
													type="text"
													className="form-control me-2"
													value={answer}
													onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
												/>
												{index > 0 && (
													<button
														type="button"
														className="btn btn-danger"
														onClick={() => handleRemoveCorrectAnswer(index)}>
														Remove
													</button>
												)}
											</div>
										))}
										<button
											type="button"
											className="btn btn-outline-info"
											onClick={handleAddCorrectAnswer}>
											Add Correct Answer
										</button>
									</div>
								)}

								{successMessage && (
									<div className="alert alert-success" role="alert">
										{successMessage}
									</div>
								)}

								{error && (
									<div className="alert alert-danger" role="alert">
										{error}
									</div>
								)}

								{!correctAnswers.length && <p>Please enter at least one correct answer.</p>}

								<div className="btn-group">
									<button type="submit" className="btn btn-outline-success mr-2">
										Save Question
									</button>
									<Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
										Back to existing questions
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddQuestion
