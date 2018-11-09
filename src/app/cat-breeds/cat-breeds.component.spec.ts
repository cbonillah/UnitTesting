import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { CatBreedsComponent } from './cat-breeds.component';
import { CatBreedsService } from '../services/cat-breeds/cat-breeds.service';
import { CatBreedsResponse } from '../models/cat-breeds-response';

describe('CatBreedsComponent', () => {

	let component: CatBreedsComponent;
	let fixture: ComponentFixture<CatBreedsComponent>;

	const catBreedsSpy = jasmine.createSpyObj('CatBreedsService', ['getCatBreeds']);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				CatBreedsComponent
			],
			providers: [
				{ provide: CatBreedsService, useValue: catBreedsSpy }
			]
		})
			.compileComponents();
	}));

	const expectedResponse: CatBreedsResponse = {
		total: 10,
		per_page: 5,
		current_page: 1,
		last_page: 2,
		next_page_url: 'next',
		prev_page_url: 'prev',
		from: 1,
		to: 5,
		data: [
			{ breed: 'Abyssinian', country: 'Ethiopia', origin: 'Natural\/Standard', coat: 'Short', pattern: 'Ticked' },
			{ breed: 'Aegean', country: 'Greece', origin: 'Natural\/Standard', coat: 'Semi-long', pattern: 'Bi- or tri-colored' },
			{ breed: 'American Curl', country: 'United States', origin: 'Mutation', coat: 'Short\/Long', pattern: 'All' },
			{ breed: 'American Bobtail', country: 'United States', origin: 'Mutation', coat: 'Short\/Long', pattern: 'All' },
			{ breed: 'American Shorthair', country: 'United States', origin: 'Natural', coat: 'Short', pattern: 'All but colorpoint' }
		]
	};

	beforeEach(() => {
		fixture = TestBed.createComponent(CatBreedsComponent);
		component = fixture.componentInstance;
		catBreedsSpy.getCatBreeds.calls.reset();
	});

	it('should create', () => {
		catBreedsSpy.getCatBreeds.and.returnValue(of(expectedResponse));

		fixture.detectChanges();

		const breedsDE = fixture.debugElement.queryAll(By.css('.breed'));

		expect(catBreedsSpy.getCatBreeds).toHaveBeenCalled();

		expect(breedsDE.length).toBe(5);
		expect(component).toBeTruthy();
	});

	it('should not display the previous page button if there is none', () => {
		catBreedsSpy.getCatBreeds.and.returnValue(of(expectedResponse));

		fixture.detectChanges();

		const previousDE = fixture.debugElement.query(By.css('#previous-page'));

		expect(previousDE).toBeNull();
	});

	it('should not display the next page button if there is none', () => {
		expectedResponse.current_page = 2;
		catBreedsSpy.getCatBreeds.and.returnValue(of(expectedResponse));

		fixture.detectChanges();

		const nextDE = fixture.debugElement.query(By.css('#next-page'));

		expect(nextDE).toBeNull();
	});

});
