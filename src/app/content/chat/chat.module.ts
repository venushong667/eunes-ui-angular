import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MarkdownModule } from 'ngx-markdown';

import { MemoboardRoutingModule } from '../memoboard/memoboard-routing.module';
import { ChatComponent } from './chat.component';



@NgModule({
    declarations: [
        ChatComponent
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
        MatMenuModule,
        MarkdownModule.forChild()
    ],
    exports: [
        ChatComponent
    ]
})
export class ChatModule { }
