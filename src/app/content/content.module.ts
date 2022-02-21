import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IconButtonModule } from '@eunes/elements/icon-button';

import { LayoutComponent } from '../layout/layout.component';
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
        IconButtonModule,
        MatIconModule,
        MatListModule
    ]
})
export class ContentModule { }
