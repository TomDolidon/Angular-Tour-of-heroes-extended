import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

import { Weapon } from '../../data/weapon';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WeaponService {

  private static url = 'weapons';

  constructor(private messageService: MessageService, private db: AngularFirestore) {
  }

  getWeapons(): Observable<Weapon[]> {

    return this.db.collection<Weapon>(WeaponService.url)
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            // Get document data
            const data = a.payload.doc.data();

            // New Weapon
            const weapon = new Weapon().fromJSON(data);

            // Get document id
            const id = a.payload.doc.id;
            weapon.id = id;

            // Use spread operator to add the id to the document data
            return weapon;

          });
        })
      );
  }

  getWeaponesTop3(): Observable<Weapon[]> {

    //
    return this.db.collection(WeaponService.url, ref => ref.limit(3))
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            /* // Get document data
            const data = a.payload.doc.data() as Weapon;

            // Get document id
            const id = a.payload.doc.id;

            // Use spread operator to add the id to the document data
            return {id, ...data};*/

            // Get document data
            const data = a.payload.doc.data();

            // New Weapon
            const weapon = new Weapon().fromJSON(data);

            // Get document id
            const id = a.payload.doc.id;
            weapon.id = id;

            // Use spread operator to add the id to the document data
            return weapon;

          });
        })
      );
  }

  private getWeaponDocument(id: string): AngularFirestoreDocument<Weapon> {

    // return document
    return this.db.doc<Weapon>(WeaponService.url + `/` + id);
  }

  getWeapon(id: string): Observable<Weapon> {

    // Return weapon observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(a => {

          // Get document data
          const data = a.payload.data() as Weapon;
          // return {id, ...data};

          // New Weapon
          const weapon = new Weapon().fromJSON(data);
          weapon.id = id;

          // Use spread operator to add the id to the document data
          return weapon;
        })
      );
  }

  addWeapon(weapon: Weapon) {
    this.db.collection<Weapon>(WeaponService.url).add(Object.assign({}, weapon));
  }

  updateWeapon(id: string, weapon: Weapon) {

    // Update document
    this.getWeaponDocument(id).update(Object.assign({}, weapon));
  }

  deleteWeapon(id: string) {

    // Delete the document
    this.getWeaponDocument(id).delete();
  }

}







/* import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';

import { Weapon } from '../../data/weapon';
import { HEROES } from '../../data/mock-weapones';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private messageService: MessageService) { }

  getWeapones(): Observable<Weapon[]> {
    this.messageService.add('WeaponService: fetched weapones');
    return of(HEROES);
  }

  getWeapon(id: number): Observable<Weapon> {
    this.messageService.add(`WeaponService: fetched weapon id=${id}`);
    return of(HEROES.find(weapon => weapon.id === id));
  }
} */
