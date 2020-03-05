import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../data/hero';
import { HeroService } from '../service/hero/hero.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeaponService } from '../service/weapon/weapon.service';
import { Weapon } from '../data/weapon';


@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.scss']
})
export class HeroNewComponent implements OnInit {

  @Input() hero: Hero;

  @Input() weapons : Weapon[];


  constructor(private heroService: HeroService, db: AngularFirestore, private weaponService: WeaponService
    , private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.hero = new Hero().fromJSON({ name: '', attack: 1, dodge: 1, dammage: 1, healPoint: 1 });
    this.getWeapons();

  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  onSaveHero() {
    if (this.getPointsLeft() == 0) {
      if (this.hero.getName() != '') {
        this.heroService.addHero(this.hero)
        this.openSnackBar("Hero created !", 'positive')
      } else {
        this.openSnackBar("The hero name cannot be empty !", 'negative')
      }
    } else {
      this.openSnackBar("you still have some points to divide up", 'negative')
    }

  }

  getSelectedWeapon() {
    return this.weapons.find(e => e.id == this.hero.weaponId);
  }

  changeCharacteristic(attr, value) {
    for (const property in this.hero) {
      if (property == attr) this.hero[property] += value;
    }
  }


  getPointsLeft() {
    return 40 - (this.hero.attack + this.hero.dammage + this.hero.dodge + this.hero.healPoint);
  }


  openSnackBar(message, style) {
    this.snackBar.open(message, null, { panelClass: ['background-' + style, 'snackBar'] });
  }

}
