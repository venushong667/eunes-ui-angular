import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Board, Memo, Project } from './constants.js';

@Injectable({
    providedIn: 'root'
})
export class MemoboardService {

    constructor(private _http: HttpClient) {}

    getProject = (id: string): Observable<Project> => {
        return this._http.get<Project>(`/api/memoboard/project/${id}`);
    }

    getProjects = (): Observable<Array<Project>> => {
        return this._http.get<Array<Project>>(`/api/memoboard/projects`);
    }

    createProject = (project: Project): Observable<Project> => {
        const body = {
            name: project.name,
            config: project.config
        };
        return this._http.post<Project>('/api/memoboard/project', body);
    }

    updateProject = (id: string, config: Object): Observable<Object> => {
        return this._http.put<Object>(`/api/memoboard/project/${id}`, config);
    }

    deleteProject = (id: string) => {
        return this._http.delete(`/api/memoboard/project/${id}`);
    }

    getBoard = (id: string): Observable<Board> => {
        return this._http.get<Board>(`/api/memoboard/board/${id}`);
    }

    getBoards = (projectId?: string): Observable<Array<Board>> => {
        if (projectId) {
            return this._http.get<Array<Board>>(`/api/memoboard/boards?projectId=${projectId}`);
        };
        return this._http.get<Array<Board>>(`/api/memoboard/boards`);
    }

    createBoard = (board: Board): Observable<Board> => {
        const body = {
            name: board.name,
            projectId: board.projectId,
            position: board.position,
            config: board.config
        }
        return this._http.post<Board>('/api/memoboard/board', body);
    }

    updateBoard = (board: Board): Observable<Board> => {
        const body = {
            name: board.name,
            projectId: board.projectId,
            position: board.position,
            config: board.config
        }
        return this._http.put<Board>(`/api/memoboard/board/${board.id}`, body);
    }

    deleteBoard = (id: string) => {
        return this._http.delete(`/api/memoboard/board/${id}`);
    }

    getMemo = (id: string): Observable<Memo> => {
        return this._http.get<Memo>(`/api/memoboard/memo/${id}`);
    }

    getMemos = (): Observable<Array<Memo>> => {
        return this._http.get<Array<Memo>>(`/api/memoboard/memos`);
    }

    createMemo = (memo: Memo): Observable<Memo> => {
        const body = {
            name: memo.name,
            boardId: memo.boardId,
            projectId: memo.projectId,
            description: memo.description,
            position: memo.position,
            config: memo.config
        }
        return this._http.post<Memo>('/api/memoboard/memo', body);
    }

    updateMemo = (memo: Memo): Observable<Memo> => {
        return this._http.put<Memo>(`/api/memoboard/memo/${memo.id}`, memo);
    }

    deleteMemo = (id: string) => {
        return this._http.delete(`/api/memoboard/memo/${id}`);
    }
}
