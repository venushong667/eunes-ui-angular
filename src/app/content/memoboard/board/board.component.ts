import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EunesWebSocketService } from '@eunes/services/websocket/websocket.component';
import each from 'lodash-es/each';
import extend from 'lodash-es/extend';
import filter from 'lodash-es/filter';
import find from 'lodash-es/find';
import sortBy from 'lodash-es/sortBy';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { Board, Memo, Project } from '../constants';
import { MemoDialogComponent } from '../memo-dialog/memo-dialog.component';
import { MemoboardService } from '../memoboard.service';

@Component({
    selector: 'memo-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

    @Input() selectProject: ReplaySubject<Project>;

    selectedProject: Project;
    EXCHANGE = 'memoboard.actions'

    @ViewChild('newBoard', { static: false }) 
    set newBoard(element: ElementRef) {
        if (element) {
            element.nativeElement.focus();
            this._newBoard = element;
        }
    }

    @ViewChild('newMemo', { static: false }) 
    set newMemo(element: ElementRef) {
        if (element) {
            element.nativeElement.focus();
            this._newMemo = element;
        }
    }

    private _newBoard: ElementRef;
    private _newMemo: ElementRef;

    busy: Subscription;

    createMemoEvent: Subject<boolean> = new Subject<boolean>();
    boards: Array<Board> = [];

    allBoards: Array<Board> = [];
    allMemos: Array<Memo> = [];
    draggingMemo: Memo;
    draggingBoard: Board

    destroy$: ReplaySubject<boolean> = new ReplaySubject();

    constructor(
        private _memo: MemoboardService,
        private _dialog: MatDialog,
        private _ws: EunesWebSocketService
    ) { }

    ngOnInit() {
        this.selectProject.subscribe((project) => {
            this.getAllItems(project.id);
            this.selectedProject = project;
        });
        this.createMemoListener();
    }

    createMemoListener() {
        this._ws.subscribeTopic(this.EXCHANGE, 'memoboard.create').subscribe((data) => {
            let memo = data.message;
            console.log(this.allMemos)
            if (!find(this.allMemos, { id: memo.id })) {
                this.addMemo(memo.boardId, memo);
            }
        });
    }

    // deleteMemoListener() {
    //     this._ws.subscribeTopic(this.EXCHANGE, 'memoboard.delete').subscribe((data) => {
    //         this.allMemos.filter()
    //     });
    // }

    getAllItems(projectId: string) {
        this.busy = this._memo.getBoards(projectId).pipe(
            mergeMap((boards) => this._memo.getMemos().pipe(
                map((memos) => {
                    each(boards, board => {
                        board.memos = sortBy(filter(memos, { 'boardId': board.id }), ['position']);
                    })
                    this.allMemos = memos;
                    return boards;
                })
            ))
        ).pipe(
            takeUntil(this.destroy$)
        ).subscribe(data => {
            this.allBoards = sortBy(data, ['position']);
        });
    }

    getConnectedList(): any[] {
        return this.allBoards.map(board => `${board.name}`);
    }

    addBoard() {
        const board: Board = {
            id: '',
            name: '',
            projectId: this.selectedProject.id,
            position: 0,
            config: {},
            memos: []
        }
        this.allBoards.push(board);
    }

    dropBoard(event: CdkDragDrop<any>) {
        if (event.previousIndex === event.currentIndex) return;

        moveItemInArray(this.allBoards, event.previousIndex, event.currentIndex);
        this.draggingBoard.position = this.computePosition(event.currentIndex, this.allBoards);
        this._memo.updateBoard(this.draggingBoard).subscribe();
    }

    createBoard(board: Board, index: number) {
        board.position = this.computePosition(index, this.allBoards);
        this._memo.createBoard(board).pipe(
            takeUntil(this.destroy$)
        ).subscribe(data => {
            extend(board, data);
        });
    }

    updateBoard(board: Board) {
        this._memo.updateBoard(board).subscribe();
    }

    deleteBoard(board: Board, index: number) {
        this.allBoards.splice(index, 1);
        this._memo.deleteBoard(board.id).pipe(
            takeUntil(this.destroy$)
        ).subscribe();
    }

    removeLatestBoard() {
        this.allBoards.pop();
    }

    addMemo(boardId: string, memo?: Memo) {
        let brd = find(this.allBoards, {id: boardId});
        if (brd) {
            const newMemo: Memo = memo || {
                id: '',
                boardId: boardId,
                projectId: this.selectedProject.id,
                name: '',
                description: '',
                position: 0,
                config: {}
            }
            brd.memos.unshift(newMemo);
        }
    }

    dropMemo(event: CdkDragDrop<any>, board: Board) {
        if (event.previousContainer === event.container && event.previousIndex === event.currentIndex) return;

        if (event.previousContainer === event.container) {
            // same container
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            // diff container
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
            this.draggingMemo.boardId = board.id;
        }

        this.draggingMemo.position = this.computePosition(event.currentIndex, board.memos);
        this._memo.updateMemo(this.draggingMemo).subscribe();
    }

    computePosition(index:number, memos: Array<Memo> | Array<Board>) {
        if (memos.length === 1) return 50000;

        let prev = 0;
        let next = 0;
        // if not first
        if (index >= 1) prev = memos[index-1].position;
        // if not last
        if (index !== memos.length-1) next = memos[index+1].position;
        
        // if first
        if (index === 0) return (0 + next) / 2;
        //  if last
        if (index === memos.length-1) return prev + 50000;
        // if middle
        return (prev + next) / 2;
    }

    toggleEdit(object: any) {
        // if (object.editing === null) {
        //     object.editing = true;
        // } else {
        //     object.editing = !object.editing;
        // }
        
    }

    
    createMemo(memo: Memo, index: number, memos: Array<Memo>) {
        memo.position = this.computePosition(index, memos);
        this._memo.createMemo(memo).pipe(
            takeUntil(this.destroy$)
        ).subscribe((data: Memo) => {
            extend(memo, data);
            this.allMemos.push(data);
        });
    }

    editMemo(memo: Memo) {
        this._dialog.open(MemoDialogComponent, {
            width: '800px',
            data: memo,
            autoFocus: false
        });
    }

    removeLatestMemo(board: Board) {
        board.memos.shift();
    }

    deleteMemo(memo: Memo, index: number, board: Board) {
        board.memos.splice(index, 1);
        this._memo.deleteMemo(memo.id).subscribe();
    }

}
