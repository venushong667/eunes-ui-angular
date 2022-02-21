import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MemoboardRoutingModule } from './memoboard-routing.module';
import { MemoboardComponent } from './memoboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


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
