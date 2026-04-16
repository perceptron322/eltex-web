import { TestBed } from '@angular/core/testing';

import { BlogStorage } from './blog-storage';

describe('BlogStorage', () => {
    let service: BlogStorage;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BlogStorage);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
