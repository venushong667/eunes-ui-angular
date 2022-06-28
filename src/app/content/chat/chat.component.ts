import { Component, ElementRef, ViewChild } from '@angular/core';
import { EunesWebSocketService } from '@eunes/services/websocket/websocket.component';
import get from 'lodash-es/get';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'eunes-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
    EXCHANGE = 'chatbot';
    USER_UTTERED_TOPIC = 'bot.user_uttered';
    BOT_UTTERED_TOPIC = 'bot.bot_uttered';

    @ViewChild('box', { static: false }) chatbox: ElementRef;

    current_msg: string = '';
    messages: any[] = [
        // { user: 'other', message: { text: 'How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!' } },
        // { user: 'other', message: { text: 'How are you!' } },
        // { user: 'me', message: { text: 'How are you!' } },
        // { user: 'me', message: { text: 'How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!' } },
        // { user: 'me', message: { text: 'How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!How are you!' } },
        // { user: 'other', message: { text: 'How are you!' } },
    ];
    active: Boolean = false;
    initialized: Boolean = false;
    userId: String;
    
    ws$: Subscription;
    destroy$: Subject<boolean> = new Subject<boolean>();
    scrollToBtm: Subject<any> = new Subject<any>();

    constructor(private _ws: EunesWebSocketService) { }

    toggleChat() {
        this.active = !this.active;
        if (!this.initialized) {
            this.initialized = true;
            this.activeBot();
        }
    }

    activeBot() {
        this.userId = 'uid';
        this.scrollBtmListener();
        this.receiveMsgListener();
        this._ws.publish(this.EXCHANGE, this.USER_UTTERED_TOPIC, { content: '/greet', session_id: this.userId });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    clear() {
        this.messages = [];
    }

    receiveMsgListener() {
        this.ws$ = this._ws.subscribeTopic(this.EXCHANGE, `${this.BOT_UTTERED_TOPIC}.${this.userId}`).pipe(
            takeUntil(this.destroy$)
        ).subscribe((data: any) => {
            console.log(data);
            let message = get(data, 'message.text');
            if (message) {
                this.addMessage('other', message);
            }
        });
    }

    scrollBtmListener() {
        this.scrollToBtm.pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => {
            setTimeout(() => {
                this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
            });
        });
    }

    addMessage(user: String, message: any) {
        this.messages.push({ user: user, message: { text: message } });
        this.scrollToBtm.next();
    }

    send() {
        if (this.current_msg) {
            this.addMessage('me', this.current_msg);
            this._ws.publish(this.EXCHANGE, this.USER_UTTERED_TOPIC, { content: this.current_msg, session_id: this.userId });
            this.current_msg = '';
        }
    }
}
