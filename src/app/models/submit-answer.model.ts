import { MessageModel } from "./message.model";

export interface SelectedAnswer {
    questionIndex: number;
    submit: boolean;
    isCorrect: boolean;
    message: MessageModel;
}
