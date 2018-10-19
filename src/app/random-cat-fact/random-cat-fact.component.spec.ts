import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks, flush } from '@angular/core/testing';

import { RandomCatFactComponent } from './random-cat-fact.component';
import { RandomCatFactService } from '../services/random-cat-fact/random-cat-fact.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RandomCatFactComponent', () => {

	let component: RandomCatFactComponent;
	let fixture: ComponentFixture<RandomCatFactComponent>;

	const randomCatFactSpy = jasmine.createSpyObj('RandomCatFactService', ['getRandomCatFact']);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				RandomCatFactComponent
			],
			providers: [
				{ provide: RandomCatFactService, useValue: randomCatFactSpy }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RandomCatFactComponent);
		component = fixture.componentInstance;
		randomCatFactSpy.getRandomCatFact.calls.reset();
	});

	it('should create and get a cat fact on init', () => {
		randomCatFactSpy.getRandomCatFact.and.returnValue(
			of({
				fact: 'A cats field of vision is about 185 degrees.',
				length: 44
			})
		);
		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalledTimes(0);

		// ngOnInit
		fixture.detectChanges();

		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalled();
		const factsDE = fixture.debugElement.queryAll(By.css('.cat-fact'));

		expect(factsDE.length).toBe(1);
		expect(component).toBeTruthy();
	});

	xit('should get another fact when 30 seconds have passed after the first call', fakeAsync(() => {
		randomCatFactSpy.getRandomCatFact.and.returnValue(
			of({
				fact: 'A cats field of vision is about 185 degrees.',
				length: 44
			})
		);
		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalledTimes(0);

		// ngOnInit
		fixture.detectChanges();

		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalled();
		const factsDE = fixture.debugElement.queryAll(By.css('.cat-fact'));

		expect(factsDE.length).toBe(1);

		// 30 seconds for next call
		tick(30000);

		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalledTimes(2);
	}));

	it('should get another fact when 30 seconds have passed after the first call', () => {
		jasmine.clock().install();
		randomCatFactSpy.getRandomCatFact.and.returnValue(
			of({
				fact: 'A cats field of vision is about 185 degrees.',
				length: 44
			})
		);
		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalledTimes(0);

		// ngOnInit
		fixture.detectChanges();

		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalled();
		const factsDE = fixture.debugElement.queryAll(By.css('.cat-fact'));

		expect(factsDE.length).toBe(1);

		// 30 seconds for next call
		jasmine.clock().tick(30000);

		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalledTimes(2);
		jasmine.clock().uninstall();
	});

	it('should clear the timeout if the add button is clicked before the service call', () => {
		jasmine.clock().install();
		randomCatFactSpy.getRandomCatFact.and.returnValue(
			of({
				fact: 'A cats field of vision is about 185 degrees.',
				length: 44
			})
		);
		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalledTimes(0);

		// ngOnInit
		fixture.detectChanges();

		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalled();
		const factsDE = fixture.debugElement.queryAll(By.css('.cat-fact'));

		expect(factsDE.length).toBe(1);

		jasmine.clock().tick(15000);

		fixture.debugElement.query(By.css('#add-btn')).triggerEventHandler('click', null);

		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalledTimes(2);

		jasmine.clock().tick(29000);
		expect(randomCatFactSpy.getRandomCatFact).toHaveBeenCalledTimes(2);

		jasmine.clock().uninstall();
	});

});
