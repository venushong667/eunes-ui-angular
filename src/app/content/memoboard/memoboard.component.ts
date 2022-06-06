import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { each, filter, find } from 'lodash';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Board, Memo } from './constants';
import { MemoDialogComponent } from './memo-dialog/memo-dialog.component';
import { MemoboardService } from './memoboard.service';

@Component({
    selector: 'app-memoboard',
    templateUrl: './memoboard.component.html',
    styleUrls: ['./memoboard.component.css']
})
export class MemoboardComponent {

    @ViewChild('newMemo', { static: false }) 
    set newMemo(element: ElementRef) {
        if (element) {
            element.nativeElement.focus();
            this._newMemo = element;
        }
    }

    private _newMemo: ElementRef;

    createMemoEvent: Subject<boolean> = new Subject<boolean>();

    boards: Array<Board> = [];

    editing = false;
    selectedMemo = '';

    percentage: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    progress: number = 0;

    timer$ = interval(100);
    allBoards: Array<Board> = [];
    allMemos: Array<Memo> = [];

    constructor(
        private _memo: MemoboardService,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getAllItems();
    }

    getAllItems() {
        this._memo.getBoards().pipe(
            mergeMap((boards) => this._memo.getMemos().pipe(
                map((memos) => {
                    each(boards, board => {
                        board.memos = filter(memos, { 'boardId': board.id })
                    })
                    console.log(boards);
                    return boards;
                })
            ))
        ).subscribe(data => {
            this.boards = data;
        });
    }

    addMemo(board: Board) {
        let brd = find(this.boards, {id: board.id});
        if (brd) {
            const memo: Memo = {
                id: '',
                boardId: board.id,
                name: '',
                config: {
                    text: ''
                },
                createdAt: new Date(),
                updatedAt: new Date()
            }
            brd.memos.unshift(memo);
        }

    }

    dropMemo(event: CdkDragDrop<any>, board: Board) {
        console.log(event)
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            // this._memo.updateMemo()
            // this._memo.updateBoard(board.id, )
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    createMemo(memo: Memo) {
        this._memo.createMemo(memo.name, memo.boardId, memo.config).subscribe(data => {
            console.log(data);
        });
    }

    dropBoard(event: CdkDragDrop<any>) {
        moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    }

    addBoard() {
        return;
    }

    getConnectedList(): any[] {
        return this.boards.map(x => `${x.name}`);
    }

    toggleEdit(object: any) {
        // if (object.editing === null) {
        //     object.editing = true;
        // } else {
        //     object.editing = !object.editing;
        // }
        
    }

    editMemo(memo: Memo) {
        this._dialog.open(MemoDialogComponent, {
            width: '800px',
            data: memo,
            autoFocus: false
        });
    }

    
    submitForm(form: NgForm) {
        console.log(form);
    }

    removeLatestMemo(board: Board) {
        board.memos.shift();
    }

    deleteMemo(memo: Memo) {
        this._memo.deleteMemo(memo.id).subscribe(data=>{
            console.log(data);
        })
    }

}
