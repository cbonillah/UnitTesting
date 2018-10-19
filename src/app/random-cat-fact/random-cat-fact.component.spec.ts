import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCatFactComponent } from './random-cat-fact.component';

describe('RandomCatFactComponent', () => {

	let component: RandomCatFactComponent;
	let fixture: ComponentFixture<RandomCatFactComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				RandomCatFactComponent
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RandomCatFactComponent);
		component = fixture.componentInstance;
	});

});
