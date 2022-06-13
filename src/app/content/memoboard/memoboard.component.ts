import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { each, extend, filter, find, sortBy } from 'lodash';
import { BehaviorSubject, interval, ReplaySubject, Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { Board, Memo, Project } from './constants';
import { MemoDialogComponent } from './memo-dialog/memo-dialog.component';
import { MemoboardService } from './memoboard.service';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

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

    @ViewChild('newBoard', { static: false }) 
    set newBoard(element: ElementRef) {
        if (element) {
            element.nativeElement.focus();
            this._newBoard = element;
        }
    }

    selectedProject: Project;

    private _newMemo: ElementRef;
    private _newBoard: ElementRef;

    createMemoEvent: Subject<boolean> = new Subject<boolean>();
    destroy$: ReplaySubject<boolean> = new ReplaySubject();

    boards: Array<Board> = [];

    editing = false;
    selectedMemo = '';

    percentage: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    progress: number = 0;

    timer$ = interval(100);
    allProjects: Array<Project> = [];
    allBoards: Array<Board> = [];
    allMemos: Array<Memo> = [];
    draggingMemo: Memo;
    draggingBoard: Board

    constructor(
        private _memo: MemoboardService,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getProjects();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    getProjects() {
        this._memo.getProjects().subscribe((data) => {
            this.allProjects = data;
        });
    }

    setProject(project: Project) {
        this.selectedProject = project;
        this.getAllItems(project.id);
    }

    getAllItems(projectId: string) {
        this._memo.getBoards(projectId).pipe(
            mergeMap((boards) => this._memo.getMemos().pipe(
                map((memos) => {
                    each(boards, board => {
                        board.memos = sortBy(filter(memos, { 'boardId': board.id }), ['position']);
                    })
                    return boards;
                })
            ))
        ).pipe(
            takeUntil(this.destroy$)
        ).subscribe(data => {
            this.allBoards = sortBy(data, ['position']);;
        });
    }

    addProject() {
        this._dialog.open(ProjectDialogComponent, {
            hasBackdrop: true,
            disableClose: false,
            backdropClass: 'dialogBackdrop',
            panelClass: 'project-dialog'
        });
    }

    getConnectedList(): any[] {
        return this.allBoards.map(x => `${x.name}`);
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
        ).subscribe();
    }

    deleteBoard(board: Board, index: number) {
        this.allBoards.splice(index, 1);
        this._memo.deleteBoard(board.id).subscribe();
    }

    removeLatestBoard() {
        this.allBoards.pop();
    }

    addMemo(board: Board) {
        let brd = find(this.allBoards, {id: board.id});
        if (brd) {
            const memo: Memo = {
                id: '',
                boardId: board.id,
                name: '',
                description: '',
                position: 0,
                config: {}
            }
            brd.memos.unshift(memo);
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

    createMemo(memo: Memo, index: number, memos: Array<Memo>) {
        memo.position = this.computePosition(index, memos);
        this._memo.createMemo(memo).pipe(
            takeUntil(this.destroy$)
        ).subscribe((data: Memo) => {
            extend(memo, data);
        });
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

    deleteMemo(memo: Memo, index: number, board: Board) {
        board.memos.splice(index, 1);
        this._memo.deleteMemo(memo.id).subscribe();
    }

}
