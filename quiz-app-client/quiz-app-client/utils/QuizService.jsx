import axios from "axios"

export const api = axios.create({
	baseURL: "http://localhost:9192/api/quizzes"
})

export const createQuestion = async (quizQuestion) => {
  try {
    const response = await api.post("/create-new-question", quizQuestion);
    const createdQuestion = response.data;

    return {
      success: true,
      message: "Question created successfully",
      data: createdQuestion,
    };
  } catch (error) {
    throw new Error("Error creating question. Please make sure all fields are filled.");
  }
};

export const getAllQuestions = async() =>{
  try {
    const response = await api.get("/all-questions")
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchQuizForUser = async(number, subject) =>{
  try {
    const response = await api.get(
			`/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`
		)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSubjects = async() =>{
  try {
    const response = await api.get("/subjects")
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const updateQuestion = async (id, question) => {
  try {
    const response = await api.put(`/question/${id}/update`, question);
    return response.data;
  } catch (error) {
    throw new Error("Error updating question. Please make sure all fields are filled.");
  }
}

export const getQuestionById = async(id) =>{
  try {
    const response = await api.get(`/question/${id}`)
		return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteQuestion = async(id) =>{
  try {
    const response = await api.delete(`/question/${id}/delete`)
		return response.data
  } catch (error) {
    console.error(error)
  }
}