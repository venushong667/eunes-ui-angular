import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';

import { Project } from './constants';
import { MemoboardService } from './memoboard.service';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

@Component({
    selector: 'app-memoboard',
    templateUrl: './memoboard.component.html',
    styleUrls: ['./memoboard.component.css']
})
export class MemoboardComponent {

    selectedProject: Project;
    editing = false;
    selectedMemo = '';
    allProjects: Array<Project> = [];

    destroy$: ReplaySubject<boolean> = new ReplaySubject();
    selectProject: ReplaySubject<any> = new ReplaySubject();

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
            this.setProject(this.allProjects[0]);
        });
    }

    setProject(project: Project) {
        this.selectedProject = project;
        this.selectProject.next(this.selectedProject);
    }

    addProject() {
        const dialog = this._dialog.open(ProjectDialogComponent, {
            hasBackdrop: true,
            disableClose: false,
            backdropClass: 'dialogBackdrop',
            panelClass: 'project-dialog'
        });
        const sub = dialog.componentInstance.createEvent.subscribe((project) => {
            this._memo.getProjects().subscribe((data) => {
                this.allProjects = data;
                this.setProject(project);
                sub.unsubscribe();
            });
        });
    }
    
    deleteProject() {
        this._memo.deleteProject(this.selectedProject.id).subscribe(() => {
            this.getProjects();
        });
    }
}
