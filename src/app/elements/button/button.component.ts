import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'eunes-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})
export class EunesButtonComponent {
    @Input() icon: string = '';
    @Input() text: string = '';
    @Input() showText: Boolean = false;
    @Input() background: Boolean = true;
    @Input() hover: Boolean = false;

    @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

    type: string; //icon-button, text-button, text-icon-button

    constructor(private elementRef: ElementRef) { 
        this.type = this.elementRef.nativeElement.getAttribute('type');
    }
    
    ngOnInit() {}
}
