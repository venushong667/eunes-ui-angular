import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoDialogComponent } from './memo-dialog.component';

describe('MemoDialogComponent', () => {
    let component: MemoDialogComponent;
    let fixture: ComponentFixture<MemoDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ MemoDialogComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MemoDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
