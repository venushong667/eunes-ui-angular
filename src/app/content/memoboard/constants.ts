
export interface Board {
    id: string;
    name: string;
    projectId: string;
    config: any;
    memos: Array<Memo>;
    editing: Boolean;
}

export interface Memo {
    id: string;
    name: string;
    boardId: string;
    config: any;
    createdAt: Date;
    updatedAt: Date;
    editing: Boolean;
}