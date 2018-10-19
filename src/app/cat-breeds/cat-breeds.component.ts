import { Component, OnInit } from '@angular/core';
import { CatBreed } from '../models/cat-breed';
import { CatBreedsService } from '../services/cat-breeds/cat-breeds.service';
import { CatBreedsResponse } from '../models/cat-breeds-response';

@Component({
	selector: 'app-cat-breeds',
	templateUrl: './cat-breeds.component.html',
	styleUrls: ['./cat-breeds.component.scss']
})
export class CatBreedsComponent implements OnInit {

	limit = 10;
	breeds: CatBreed[] = [];
	page: number;
	pages: number;
	from: number;
	to: number;
	total: number;

	get hasPreviousPage() { return this.page > 1; }
	get hasNextPage() { return this.page < this.pages; }

	constructor(
		private catBreeds: CatBreedsService
	) { }

	ngOnInit() {
		this.loadPage(1);
	}

	loadPage(page: number) {
		this.catBreeds.getCatBreeds(this.limit, page)
			.subscribe(
				(response: CatBreedsResponse) => {
					this.from = response.from;
					this.to = response.to;
					this.total = response.total;
					this.page = response.current_page;
					this.pages = response.last_page;
					this.breeds = response.data;
				}
			);
	}

	previousPage() {
		if (this.page > 0) {
			this.loadPage(this.page - 1);
		}
	}

	nextPage() {
		if (this.page < this.pages) {
			this.loadPage(this.page + 1);
		}
	}

}
