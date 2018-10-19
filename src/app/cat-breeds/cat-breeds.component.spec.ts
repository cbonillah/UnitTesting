import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatBreedsComponent } from './cat-breeds.component';

describe('CatBreedsComponent', () => {

	let component: CatBreedsComponent;
	let fixture: ComponentFixture<CatBreedsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				CatBreedsComponent
			]
		})
			.compileComponents();
	}));


	beforeEach(() => {
		fixture = TestBed.createComponent(CatBreedsComponent);
		component = fixture.componentInstance;
	});

});
