import { CatBreed } from './cat-breed';

export interface CatBreedsResponse {
	total: number;
	per_page: number;
	current_page: number;
	last_page: number;
	next_page_url: string;
	prev_page_url: string;
	from: number;
	to: number;
	data: CatBreed[];
}
