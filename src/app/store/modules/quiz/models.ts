declare namespace quizModels {
    export interface QuizResponse {
        response_code: number;
        results: Question[];
    }

    export interface Question {
        index?: number;
        category: string;
        type: string;
        difficulty: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
        completed?: boolean;
        answers: Answer[]
    }

    interface Answer {
        text: string;
        isCorrect: boolean;
        selected: boolean;
    }

    export interface State {
        questions: Question[];
        currentQuestionIndex: number;
        score: number;
    }
}

const initialState: quizModels.State = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0
}

export { quizModels, initialState };
