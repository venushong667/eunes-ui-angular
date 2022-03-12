import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EunesButtonComponent } from './button.component';

@NgModule({
    declarations: [
        EunesButtonComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [
        EunesButtonComponent
    ]
})
export class EunesButtonModule { }
