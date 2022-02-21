import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { IconButtonComponent } from './icon-button.component';

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
