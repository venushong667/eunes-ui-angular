import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Board, Memo } from './constants.js';

@Injectable({
    providedIn: 'root'
})
export class MemoboardService {

    constructor(private _http: HttpClient) {}

    getProjects = (id?: string) => {
        if (id) {
            return this._http.get<Object>(`/api/memoboard/project/${id}`);
        } else {
            return this._http.get<Array<Object>>(`/api/memoboard/projects`);
        }
    }

    createProject = (config: Object): Observable<Object> => {
        return this._http.post<Object>('/api/memoboard/project', config);
    }

    updateProject = (id: string, config: Object): Observable<Object> => {
        return this._http.put<Object>(`/api/memoboard/project/${id}`, config);
    }

    deleteProject = (id: string) => {
        return this._http.delete(`/api/memoboard/project/${id}`);
    }

    getBoard = (id?: string): Observable<Board> => {
        return this._http.get<Board>(`/api/memoboard/board/${id}`);
    }

    getBoards = (id?: string): Observable<Array<Board>> => {
        return this._http.get<Array<Board>>(`/api/memoboard/boards`);
    }

    createBoard = (config: any): Observable<Board> => {
        return this._http.post<Board>('/api/memoboard/board', config);
    }

    updateBoard = (id: string, config: any): Observable<Board> => {
        return this._http.put<Board>(`/api/memoboard/board/${id}`, config);
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

    createMemo = (name: string, boardId: string, config: any): Observable<Memo> => {
        const body = {
            name: name,
            boardId: boardId,
            config: config
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