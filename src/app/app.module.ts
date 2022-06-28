import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyConfig, NgBusyModule } from 'ng-busy';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingComponent } from './elements/loading/loading.component';

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        NgBusyModule.forRoot(new BusyConfig({
            message: 'Loading...',
            template: LoadingComponent,
            backdrop: false,
            templateNgStyle: { "background-color": "black" }
        })),
        MarkdownModule.forRoot({
            markedOptions: {
                provide: MarkedOptions,
                useValue: {
                    gfm: true,
                    breaks: true,
                    pedantic: false,
                    smartLists: true,
                    smartypants: false,
                },
            },
        }),
    ],
    entryComponents: [
        LoadingComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
