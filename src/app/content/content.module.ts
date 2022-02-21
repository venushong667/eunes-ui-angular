import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { LayoutComponent } from '../layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconButtonModule } from '@eunes/elements/icon-button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

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
