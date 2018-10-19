import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatFact } from '../models/cat-fact';
import { RandomCatFactService } from '../services/random-cat-fact/random-cat-fact.service';

@Component({
	selector: 'app-random-cat-fact',
	templateUrl: './random-cat-fact.component.html',
	styleUrls: ['./random-cat-fact.component.scss']
})
export class RandomCatFactComponent implements OnInit, OnDestroy {

	private timeout;

	facts: CatFact[] = [];

	constructor(
		private factsService: RandomCatFactService
	) { }

	ngOnInit() {
		this.addFact();
	}

	ngOnDestroy() {
		clearTimeout(this.timeout);
		this.timeout = null;
	}

	resetTimeout() {
		this.timeout = window.setTimeout(() => {
			this.timeout = null;
			this.addFact();
		}, 30000);
	}

	addFact() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
		this.factsService.getRandomCatFact().subscribe(
			fact => {
				this.facts.push(fact);
				this.resetTimeout();
			}
		);
	}

}
