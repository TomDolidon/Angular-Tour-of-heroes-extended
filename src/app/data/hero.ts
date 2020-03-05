import {Serializable} from './serializable';

export class Hero extends Serializable {
    id: string;
    name: string;
    attack: number;
    dodge: number;
    dammage:number;
    healPoint:number;
    weaponId: string;

    getId(): string {
      return this.id;
    }

    getName(): string {
      return this.name;
    }

    getAttack(): number {
      return this.attack;
    }

    getDodge(): number {
      return this.dodge;
    } 
     getDammage(): number {
      return this.dammage;
    }  
    
    getHealPoint(): number {
      return this.healPoint;
    }

    getWeaponId(): string {
      return this.weaponId;
    }


  }