import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { MemoboardComponent } from './memoboard.component';
import { MemoboardRoutingModule } from './memoboard-routing.module';


@NgModule({
    declarations: [
        MemoboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MemoboardRoutingModule,
        FlexLayoutModule,
        MatListModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule
    ]
})
export class MemoboardModule { }
