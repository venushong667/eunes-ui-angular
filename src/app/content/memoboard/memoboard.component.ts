import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-memoboard',
    templateUrl: './memoboard.component.html',
    styleUrls: ['./memoboard.component.css']
})
export class MemoboardComponent implements OnInit {
    current_msg: string = '';
    messages: any[] = [];

    constructor() { }
    
    ngOnInit(): void {
    }

    clear() {
        this.messages = [];
    }

    send() {
        this.messages.push({user: 'me', message: this.current_msg});
        this.current_msg = '';
    }
    
    onKeyDown(event: Event) {
        console.log(event)
    }
}
