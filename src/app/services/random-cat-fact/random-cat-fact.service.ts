import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatFact } from 'src/app/models/cat-fact';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RandomCatFactService {

	constructor(
		private http: HttpClient
	) { }

	getRandomCatFact(): Observable<CatFact> {
		return this.http.get<CatFact>('http://localhost:3000/fact');
	}

}
