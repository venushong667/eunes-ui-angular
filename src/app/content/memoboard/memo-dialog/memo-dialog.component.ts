import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Memo } from '../constants';

@Component({
    selector: 'memo-dialog',
    templateUrl: './memo-dialog.component.html',
    styleUrls: ['./memo-dialog.component.css']
})
export class MemoDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public memo: Memo) {}

    editing = false;

    ngOnInit(): void {
        console.log(this.memo)
    }

    enter(event: any) {
        if (event.key === "Enter") {
            this.editing = false;
        }
    }

    edit(event: any) {
        this.editing = true;
    }

}
