import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { HeroService } from '../service/hero/hero.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { log } from 'util';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {


  heroes: Hero[];

  selectedProperty = "";
  isSortingAsc =  true;

  constructor(private heroService: HeroService, db: AngularFirestore) {
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  } 

  ngOnInit() {
    this.getHeroes();    
  } 

  sortBy(property) {
    if(this.selectedProperty == property) {
      this.isSortingAsc = !this.isSortingAsc;
    } 

    if(this.isSortingAsc) {        
      this.heroes.sort((a,b) => {
        return a[property] - b[property];
      })
    } else {        
      this.heroes.sort((a,b) => {
        return b[property] - a[property];
      })
    }
  }

}
