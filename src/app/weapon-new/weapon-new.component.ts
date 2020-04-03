import { Component, OnInit, Input } from '@angular/core';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon/weapon.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';


@Component({
  selector: 'app-weapon-new',
  templateUrl: './weapon-new.component.html',
  styleUrls: ['./weapon-new.component.scss']
})
export class WeaponNewComponent implements OnInit {

  @Input() weapon : Weapon;

  constructor(private weaponService: WeaponService, db: AngularFirestore, private snackBar: MatSnackBar,  private location: Location
    ) { }

  ngOnInit() {
    this.weapon = new Weapon().fromJSON({name: '', attack: 0, dodge: 0, dammage: 0, healPoint: 0});

  }

  onSaveWeapon() {
    console.log(this.weapon)
    if (this.getPointsLeft() == 0) {
      if(this.weapon.getName() != '') {
        this.weaponService.addWeapon(this.weapon)       
        this.openSnackBar("Weapon created !", 'positive')
      } else {
        this.openSnackBar("The weapon name cannot be empty !", 'negative')
      }
  } else {
    this.openSnackBar("you still have some points to divide up", 'negative')
  }

      
  }

  changeCharacteristic(attr, value) {
    for (const property in this.weapon) {
      if( property == attr) this.weapon[property] += value;
    }
  }


  getPointsLeft(){
    return 0 - (this.weapon.attack + this.weapon.dammage + this.weapon.dodge + this.weapon.healPoint);
  }


  openSnackBar(message, style) {
      this.snackBar.open(message, null, {panelClass: [ 'background-' + style, 'snackBar'], duration: 3000});
  }

  goBack(): void {
    this.location.back();
  }


}
