import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Project } from '../constants';
import { MemoboardService } from '../memoboard.service';

@Component({
    selector: 'app-project-dialog',
    templateUrl: './project-dialog.component.html',
    styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {

    @Output() createEvent = new EventEmitter<Project>();

    constructor(
        public dialogRef: MatDialogRef<ProjectDialogComponent>,
        private _memo: MemoboardService
    ) {}

    name = '';

    ngOnInit(): void {
    }

    createProject() {
        const project: Project = {
            id: '',
            name: this.name,
            config: {}
        }
        this._memo.createProject(project).subscribe((data) => {
            this.createEvent.emit(data);
            this.dialogRef.close();
        });
    }

}
