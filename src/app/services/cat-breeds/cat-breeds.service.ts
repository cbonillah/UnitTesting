import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatBreedsResponse } from 'src/app/models/cat-breeds-response';

@Injectable({
	providedIn: 'root'
})
export class CatBreedsService {

	private catBreedsLength = 98;

	constructor(
		private http: HttpClient
	) { }

	getCatBreeds(limit: number = 25, page: number = 1): Observable<CatBreedsResponse> {
		const params = {
			limit: limit.toString(),
			page: page.toString()
		};
		return this.http.get<CatBreedsResponse>('http://localhost:3000/breeds', { params });
	}

	getAllCatBreeds(): Observable<CatBreedsResponse> {
		return this.getCatBreeds(this.catBreedsLength);
	}

}
