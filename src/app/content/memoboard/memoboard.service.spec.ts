import { TestBed } from '@angular/core/testing';

import { MemoboardService } from './memoboard.service';

describe('MemoboardService', () => {
    let service: MemoboardService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MemoboardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
