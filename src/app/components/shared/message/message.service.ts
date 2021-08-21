import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { MessageModel } from "src/app/models/message.model";

@Injectable({
    providedIn: 'root'
})
export class MessageService { 
    private subject = new Subject<MessageModel>();

    constructor() {}

    getMessage(): Observable<MessageModel> {
        return this.subject.asObservable();
    }

    setMessage(message: MessageModel) {
        this.subject.next(message);
    }

    clear() {
        this.subject.next({text: '', type: ''});
    }
}