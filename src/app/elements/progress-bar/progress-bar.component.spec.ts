import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EunesProgressBarComponent } from './progress-bar.component';

describe('EunesProgressBarComponent', () => {
    let component: EunesProgressBarComponent;
    let fixture: ComponentFixture<EunesProgressBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EunesProgressBarComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EunesProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
