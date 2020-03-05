import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../data/hero';
import { HeroService }  from '../service/hero/hero.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon/weapon.service';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  @Input() weapons : Weapon[];
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private snackBar: MatSnackBar,
    private weaponService: WeaponService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
  }
  
  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
    .subscribe(weapons => this.weapons = weapons);
  } 

  getSelectedWeapon() {
    return this.weapons.find(e => e.id == this.hero.weaponId);
  }

  goBack(): void {
    this.location.back();
  }

  changeCharacteristic(attr, value) {
    for (const property in this.hero) {
      if( property == attr) this.hero[property] += value;
    }
  }

  saveHeroCharacteristics() {
    console.log(this.hero);
    
    if (this.getPointsLeft() == 0) {
        if(this.hero.getName() != '') {
          this.heroService.updateHero(this.hero.getId(), this.hero);
          this.openSnackBar("Modifications saved", 'positive')
        } else {
          this.openSnackBar("The hero name cannot be empty !", 'negative')
        }
    } else {
      this.openSnackBar("you still have some points to divide up", 'negative')
    }

    //this.pointsLeft = 40 - (this.hero.attack + this.hero.dammage + this.hero.dodge + this.hero.healPoint);
    
  }

  getPointsLeft(){
    return 40 - (this.hero.attack + this.hero.dammage + this.hero.dodge + this.hero.healPoint);
  }


  openSnackBar(message, style) {
      this.snackBar.open(message, null, {panelClass: [ 'background-' + style, 'snackBar']});
  }

}


