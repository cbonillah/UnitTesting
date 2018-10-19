import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CatBreedsService } from './cat-breeds.service';
import { HttpRequest } from '@angular/common/http';
import { CatBreedsResponse } from 'src/app/models/cat-breeds-response';

describe('CatBreedsService', () => {

	let service: CatBreedsService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			]
		});

		service = TestBed.get(CatBreedsService);
		httpController = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#getCatBreeds', () => {
		const breeds = [
			{ 'breed': 'Abyssinian', 'country': 'Ethiopia', 'origin': 'Natural\/Standard', 'coat': 'Short', 'pattern': 'Ticked' },
			{ 'breed': 'Aegean', 'country': 'Greece', 'origin': 'Natural\/Standard', 'coat': 'Semi-long', 'pattern': 'Bi- or tri-colored' },
			{ 'breed': 'American Curl', 'country': 'United States', 'origin': 'Mutation', 'coat': 'Short\/Long', 'pattern': 'All' },
			{ 'breed': 'American Bobtail', 'country': 'United States', 'origin': 'Mutation', 'coat': 'Short\/Long', 'pattern': 'All' },
			{ 'breed': 'American Shorthair', 'country': 'United States', 'origin': 'Natural', 'coat': 'Short', 'pattern': 'All but colorpoint' },
			{ 'breed': 'American Wirehair', 'country': 'United States', 'origin': 'Mutation', 'coat': 'Rex', 'pattern': 'All but colorpoint' }
		];

		const expectedResponse = {
			total: 6,
			per_page: 6,
			current_page: 1,
			last_page: 1,
			next_page_url: '',
			prev_page_url: '',
			from: 1,
			to: 6,
			data: breeds
		};

		it('should call the cat breeds service with a limit of 25 breeds when called with no arguments', () => {
			service.getCatBreeds().subscribe(
				(response: CatBreedsResponse) => {
					expect(response).toBeDefined();
					expect(response).toBe(expectedResponse);
				}
			);

			const httpCall = httpController.match((req: HttpRequest<any>) => req.url === 'http://localhost:3000/breeds').pop();
			// const httpCall = httpController.expectOne('http://localhost:3000/breeds?limit=25&page=1');

			expect(httpCall).toBeDefined();
			expect(httpCall.request.method).toEqual('GET');
			expect(httpCall.request.params.has('limit')).toBeTruthy();
			expect(httpCall.request.params.get('limit')).toEqual('25');
			expect(httpCall.request.params.has('page')).toBeTruthy();
			expect(httpCall.request.params.get('page')).toEqual('1');

			httpCall.flush(expectedResponse);

			httpController.verify();
		});

		it('should call the cat breeds service with a given limit and page', () => {
			service.getCatBreeds(10, 2).subscribe(
				(response: CatBreedsResponse) => {
					expect(response).toBeDefined();
					expect(response).toBe(expectedResponse);
				}
			);

			const httpCall = httpController.match((req: HttpRequest<any>) => req.url === 'http://localhost:3000/breeds').pop();
			// const httpCall = httpController.expectOne('http://localhost:3000/breeds?limit=25&page=1');

			expect(httpCall).toBeDefined();
			expect(httpCall.request.method).toEqual('GET');
			expect(httpCall.request.params.has('limit')).toBeTruthy();
			expect(httpCall.request.params.get('limit')).toEqual('10');
			expect(httpCall.request.params.has('page')).toBeTruthy();
			expect(httpCall.request.params.get('page')).toEqual('2');

			httpCall.flush(expectedResponse);

			httpController.verify();
		});

	});

	describe('#getAllCatBreeds', () => {
		const breeds = [
			{ 'breed': 'Abyssinian', 'country': 'Ethiopia', 'origin': 'Natural\/Standard', 'coat': 'Short', 'pattern': 'Ticked' },
			{ 'breed': 'Aegean', 'country': 'Greece', 'origin': 'Natural\/Standard', 'coat': 'Semi-long', 'pattern': 'Bi- or tri-colored' },
			{ 'breed': 'American Curl', 'country': 'United States', 'origin': 'Mutation', 'coat': 'Short\/Long', 'pattern': 'All' },
			{ 'breed': 'American Bobtail', 'country': 'United States', 'origin': 'Mutation', 'coat': 'Short\/Long', 'pattern': 'All' },
			{ 'breed': 'American Shorthair', 'country': 'United States', 'origin': 'Natural', 'coat': 'Short', 'pattern': 'All but colorpoint' },
			{ 'breed': 'American Wirehair', 'country': 'United States', 'origin': 'Mutation', 'coat': 'Rex', 'pattern': 'All but colorpoint' }
		];

		const expectedResponse = {
			total: 6,
			per_page: 6,
			current_page: 1,
			last_page: 1,
			next_page_url: '',
			prev_page_url: '',
			from: 1,
			to: 6,
			data: breeds
		};

		it('should call the cat breeds service requesting every cat breed when prompted to', () => {
			const serviceSpy = spyOn(service, 'getCatBreeds');
			serviceSpy.and.callThrough();

			service.getAllCatBreeds().subscribe(
				(response: CatBreedsResponse) => {
					expect(response).toBeDefined();
					expect(response).toBe(expectedResponse);
				}
			);

			expect(serviceSpy).toHaveBeenCalledWith(service['catBreedsLength']);

			const httpCall = httpController.match((req: HttpRequest<any>) => req.url === 'http://localhost:3000/breeds').pop();
			// const httpCall = httpController.expectOne('http://localhost:3000/breeds?limit=25&page=1');

			expect(httpCall).toBeDefined();
			expect(httpCall.request.method).toEqual('GET');
			expect(httpCall.request.params.has('limit')).toBeTruthy();
			expect(httpCall.request.params.get('limit')).toEqual('98');
			expect(httpCall.request.params.has('page')).toBeTruthy();
			expect(httpCall.request.params.get('page')).toEqual('1');

			httpCall.flush(expectedResponse);

			httpController.verify();
		});

	});

});
