import {Serializable} from './serializable';

export class Weapon extends Serializable {
    id: string;
    name: string;
    attack: number;
    dodge: number;
    dammage:number;
    healPoint:number;


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

  }