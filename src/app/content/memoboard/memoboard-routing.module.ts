import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemoboardComponent } from './memoboard.component';

const routes: Routes = [
    {
        path: '',
        component: MemoboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemoboardRoutingModule { }
