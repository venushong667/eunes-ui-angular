import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { EunesIconButtonModule } from '@eunes/elements/icon-button';

import { LayoutComponent } from '../layout/layout.component';
import { ChatModule } from './chat/chat.module';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
    declarations: [
        ContentComponent,
        LayoutComponent
    ],
    imports: [
        CommonModule,
        ContentRoutingModule,
        FormsModule,
        FlexLayoutModule,
        EunesIconButtonModule,
        ChatModule,
        MatDividerModule,
        MatIconModule,
        MatListModule
    ]
})
export class ContentModule { }
