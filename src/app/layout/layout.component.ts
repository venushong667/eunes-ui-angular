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
            path: '/memoboard',
            type: 'service'
        },
        {
            name: 'Test_Note',
            icon: 'sticky_note_2',
            path: '/login',
            type: 'service'
        },
        {
            name: 'Shopping',
            icon: 'shopping_bag',
            path: '/shopping',
            type: 'service'
        },
        {
            name: 'Piggy Bank',
            icon: 'savings',
            path: '/piggy',
            type: 'service'
        }
    ]

    UTILITIES = [
        {
            name: 'Help',
            icon: 'help',
            path: '/help',
            type: 'utility'
        },
        {
            name: 'Settings',
            icon: 'settings',
            path: '/settings',
            type: 'utility'
        }
    ]

    showText: Boolean = false;

    constructor() { }
    
    // ngOnInit(): void {
    // }

    toggleButtonText(show: Boolean) {
        this.showText = show;
    }
    
}
