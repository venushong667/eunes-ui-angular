import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Memo } from '../constants';
import { MemoboardService } from '../memoboard.service';

@Component({
    selector: 'memo-dialog',
    templateUrl: './memo-dialog.component.html',
    styleUrls: ['./memo-dialog.component.css']
})
export class MemoDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<MemoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public memo: Memo,
        private  _renderer: Renderer2,
        private _memoboard: MemoboardService
    ) {}

    editing = false;
    editingClass = 'editing';
    editingElement: any;
    currentInput: string;

    exitEditEvent: Subject<any> = new Subject();
    destroy$: ReplaySubject<boolean> = new ReplaySubject();

    ngOnInit(): void {
        this.editing = false;
        this.exitEditListener();
        this.saveBeforeCloseListener();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    exitEditListener() {
        this.exitEditEvent.pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => {
            this._renderer.removeClass(this.editingElement, this.editingClass);
            this.editingElement.blur();
            this.editingElement = null;
        });
    }

    saveBeforeCloseListener() {
        this.dialogRef.beforeClosed().pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => {
            this.updateMemo();
        });
    }

    enter(event: Event) {
        event.preventDefault();
        if (this.editingElement) {
            this.exitEditEvent.next();
        }
    }

    exitEdit() {
        if (this.editingElement) {
            this.exitEditEvent.next();
        }
    }

    edit(event: any) {
        const hasClass = event.srcElement.classList.contains(this.editingClass);

        if (!hasClass && !this.editingElement) {
            this.editingElement = event.srcElement;
            this._renderer.addClass(this.editingElement, this.editingClass);
        }
    }

    updateMemo() {
        this._memoboard.updateMemo(this.memo).pipe(
            take(1)
        ).subscribe();
    }
    
    resizeText(desc: any) {
        if (desc.scrollHeight < 300) {
            desc.style.height = '1px';
            desc.style.height = desc.scrollHeight+'px';
        } 
    }

    closeDialog() {
        this.dialogRef.close();
    }

}
