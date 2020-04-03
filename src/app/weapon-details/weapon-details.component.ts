import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Weapon } from '../data/weapon';
import { WeaponService }  from '../service/weapon/weapon.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-weapon-details',
  templateUrl: './weapon-details.component.html',
  styleUrls: ['./weapon-details.component.scss']
})
export class WeaponDetailsComponent implements OnInit {

  @Input() weapon: Weapon;
  
  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location,
    private snackBar: MatSnackBar,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.getWeapon();
  }
  
  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }

  goBack(): void {
    this.location.back();
  }

  changeCharacteristic(attr, value) {
    for (const property in this.weapon) {
      if( property == attr) this.weapon[property] += value;
    }
  }

  saveWeaponCharacteristics() {
    if (this.getPointsLeft() == 0) {
        if(this.weapon.getName() != '') {
          this.weaponService.updateWeapon(this.weapon.getId(), this.weapon);
          this.openSnackBar("Modifications saved", 'positive')
        } else {
          this.openSnackBar("The weapon name cannot be empty !", 'negative')
        }
    } else {
      this.openSnackBar("you still have some points to divide up", 'negative')
    }    
  }

  getPointsLeft(){
    return 0 - (this.weapon.attack + this.weapon.dammage + this.weapon.dodge + this.weapon.healPoint);
  }


  openSnackBar(message, style) {
      this.snackBar.open(message, null, {panelClass: [ 'background-' + style, 'snackBar'], duration: 3000});
  }

  deleteHero(){
    this.weaponService.deleteWeapon(this.weapon.id);
    this.openSnackBar("Weapon deleted", 'positive')
    this.router.navigateByUrl('/dashboard');
    }
}


