import { Component, Input } from '@angular/core';

@Component({
    selector: 'eunes-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.css']
})
export class EunesProgressBarComponent {

    private _value: number = 0;

    @Input() maxValue: number = 100;
    
    @Input()
    set value(val: number) {
        if (val <= 100) {
            this._value = Math.round((val / this.maxValue) * 100);
        }
    }
    get value(): number {
        return this._value;
    }


    constructor() { }

    ngOnInit() {
    }

}
