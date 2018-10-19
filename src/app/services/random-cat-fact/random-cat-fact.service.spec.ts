import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RandomCatFactService } from './random-cat-fact.service';
import { CatFact } from 'src/app/models/cat-fact';

describe('RandomCatFactService', () => {
	let service: RandomCatFactService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			]
		});

		service = TestBed.get(RandomCatFactService);
		httpController = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#getRandomCatFact', () => {

		const expectedResponse = {
			fact: 'A cat\'s jaw has only up and down motion; it does not have any lateral, side to side motion, like dogs and humans.',
			length: 113
		};

		it('should return a cat fact when calling the service successfully', () => {
			service.getRandomCatFact().subscribe(
				(fact: CatFact) => {
					expect(fact).toBeDefined();
					expect(fact).toBe(expectedResponse);
				}
			);

			const httpCall = httpController.expectOne('http://localhost:3000/fact');
			expect(httpCall.request.method).toEqual('GET');

			httpCall.flush(expectedResponse);

			httpController.verify();
		});

	});

});
