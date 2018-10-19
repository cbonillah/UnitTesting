import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RandomCatFactService } from './random-cat-fact.service';

describe('RandomCatFactService', () => {
	let service: RandomCatFactService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			]
		});

		service = TestBed.get(RandomCatFactService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

});
