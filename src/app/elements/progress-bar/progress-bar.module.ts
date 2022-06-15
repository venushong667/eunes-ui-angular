import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'

import { EunesProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        EunesProgressBarComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule
    ],
    exports: [
        EunesProgressBarComponent
    ]
})
export class EunesProgressBarModule { }
