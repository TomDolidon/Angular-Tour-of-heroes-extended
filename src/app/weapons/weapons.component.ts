import { Component, OnInit } from '@angular/core';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon/weapon.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {


  weapons: Weapon[];

  selectedProperty: "";
  isSortingAsc =  true;

  constructor(private weaponService: WeaponService, db: AngularFirestore) {
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
    .subscribe(weapons => this.weapons = weapons);
  } 

  ngOnInit() {
    this.getWeapons();
    
  } 

  filterBy(property) {

    if(this.selectedProperty == property) {
      this.isSortingAsc = !this.isSortingAsc;
    } 

    if(this.isSortingAsc) {
      this.weapons.sort((a,b) => {
        return a[property] - b[property];
      })
    } else {
      this.weapons.sort((a,b) => {
        return b[property] - a[property];
      })
    }

  }

}
