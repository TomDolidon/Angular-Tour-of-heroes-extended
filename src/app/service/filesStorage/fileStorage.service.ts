/* import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

import {map} from 'rxjs/operators';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

	
export interface MyData {
  name: string;
  filepath: string;
  size: number;
}



@Injectable({
  providedIn: 'root'
})
export class FileStorageService {


  constructor(private storage: AngularFireStorage, private database: AngularFirestore) {
    this.imageCollection = database.collection<MyData>('HeroAvatar');
    this.images = this.imageCollection.valueChanges();
  }

    imageCollection;


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
      const path = `freakyStorage/${new Date().getTime()}_${file.name}`;
   
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
    }

    addImagetoDB(image: MyData) {
      //Create an ID for document
      const id = this.database.createId();
   
      //Set document id with value in database
      this.imageCollection.doc(id).set(image).then(resp => {
        console.log(resp);
      }).catch(error => {
        console.log("error " + error);
      });
    }


}



*/

