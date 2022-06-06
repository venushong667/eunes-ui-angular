
export interface Board {
    id: string;
    name: string;
    projectId: string;
    config: any;
    memos: Array<Memo>;
}

export interface Memo {
    id: string;
    name: string;
    boardId: string;
    description: string;
    position: number;
    config: any;
}