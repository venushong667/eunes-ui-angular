import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    modules_icon = ['event_note', 'sticky_note_2', 'shopping_bag', 'savings', 'pets']

    MODULES = [
        {
            name: 'Memoboard',
            icon: 'event_note',
            path: '/memoboard'
        },
        {
            name: 'Test_Note',
            icon: 'sticky_note_2',
            path: '/login'
        },
        {
            name: 'Shopping',
            icon: 'shopping_bag',
            path: '/shopping'
        },
        {
            name: 'Piggy Bank',
            icon: 'savings',
            path: '/piggy'
        }
    ]
    constructor() { }
    
    ngOnInit(): void {
    }
    
}
