import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IconButtonComponent } from './icon-button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        IconButtonComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [
        IconButtonComponent
    ]
})
export class IconButtonModule { }
