import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../data/hero';
import { HeroService }  from '../service/hero/hero.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon/weapon.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
//import { MyData } from '../service/filesStorage/fileStorage.service';
import { finalize, tap } from 'rxjs/operators';

	
export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  @Input() weapons : Weapon[];
  
  @Input() fileToUpload: File = null;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private snackBar: MatSnackBar,
    private weaponService: WeaponService,
    private router: Router,
    private storage: AngularFireStorage, private database: AngularFirestore
  ) {


    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('Avatar');
    this.images = this.imageCollection.valueChanges();
  }

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
    
  }

  getPointsLeft(){
    return 40 - (this.hero.attack + this.hero.dammage + this.hero.dodge + this.hero.healPoint);
  }

  openSnackBar(message, style) {
      this.snackBar.open(message, null, {panelClass: [ 'background-' + style, 'snackBar'], duration: 3000});
  }

  deleteHero(){
      this.heroService.deleteHero(this.hero.id);
      this.openSnackBar("Hero deleted", 'positive')
      this.router.navigateByUrl('/dashboard');

  }



  // Upload Task 
  task: AngularFireUploadTask;
 
  // Progress in percentage
  percentage: Observable<number>;
 
  // Snapshot of uploading file
  snapshot: Observable<any>;
 
  // Uploaded File URL
  UploadedFileURL: Observable<string>;
 
  //Uploaded Image List
  images: Observable<MyData[]>;
 
  //File details  
  fileName:string;
  fileSize:number;
 
  //Status check 
  isUploading:boolean;
  isUploaded:boolean;
 
  private imageCollection: AngularFirestoreCollection<MyData>;
 
 
  uploadFile(event: FileList) {
    

    
 
    // The File object
    const file = event.item(0)
 
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
 
    this.isUploading = true;
    this.isUploaded = false;
 
 
    this.fileName = file.name;
 
    // The storage path
    const path = `dolidtourImages/${new Date().getTime()}_${file.name}`;
 
    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };
 
    //File reference
    const fileRef = this.storage.ref(path);
 
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
 
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();

        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });

                
          this.hero.urlAvatar = resp;

          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )

    this.snapshot.subscribe()
  }
 
  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();
 
    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
    }).catch(error => {
      console.log("error " + error);
    });
  }

}


