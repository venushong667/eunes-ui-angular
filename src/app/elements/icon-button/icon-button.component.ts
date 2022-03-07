import { Component, Input } from '@angular/core';

@Component({
    selector: 'eunes-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.css']
})
export class EunesIconButtonComponent {
    @Input() icon: string = '';
    @Input() text: string = '';
    @Input() showText: Boolean = false;

    constructor() { }
    
    
}
