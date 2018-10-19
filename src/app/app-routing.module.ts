import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomCatFactComponent } from './random-cat-fact/random-cat-fact.component';
import { CatBreedsComponent } from './cat-breeds/cat-breeds.component';

const routes: Routes = [
	{
		path: '',
		component: RandomCatFactComponent
	},
	{
		path: 'breeds',
		component: CatBreedsComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
