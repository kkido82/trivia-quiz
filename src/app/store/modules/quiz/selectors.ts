import { createFeatureSelector, createSelector } from "@ngrx/store";
import { quizModels } from "./models";

export const selectState = 
    createFeatureSelector<quizModels.State>('quiz');

export const selectCurrentQuestionIndex = createSelector(
    selectState, 
    state => state.currentQuestionIndex
);

export const selectScore = createSelector(
    selectState,
    state => state.score
);

export const selectQuestions = createSelector(
    selectState,
    state => state.questions
);
