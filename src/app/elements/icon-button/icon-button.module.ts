import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EunesIconButtonComponent } from './icon-button.component';

@NgModule({
    declarations: [
        EunesIconButtonComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [
        EunesIconButtonComponent
    ]
})
export class EunesIconButtonModule { }
