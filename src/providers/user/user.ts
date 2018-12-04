import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
@Injectable()
export class UserProvider {
firedata = firebase.database().ref('/users');

  constructor(public afireauth: AngularFireAuth, public afiredatabase: AngularFireDatabase) {
    console.log('Hello UserProvider Provider');
  }
  register(newuser) {
          return new Promise((resolve, reject) => {
              this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
                  this.afireauth.auth.currentUser.updateProfile({
                      displayName: newuser.name,
                      photoURL: ''
                  }).then(() => {
                      this.afiredatabase.list('/users/').update(this.afireauth.auth.currentUser.uid, {
                          uid : this.afireauth.auth.currentUser.uid,
                          displayName : newuser.name,
                          type: newuser.type
                      }).then((res)=>{
                          console.log(res)
                          resolve({ success: true });
                      });
                  }).catch((err) => {
                      console.log(err);
                      reject(err);
                  })
              }).catch((err) => {
                  console.log(err);
                  reject(err);
              })
          })
      }
deleteUser(){
   var user = firebase.auth().currentUser;
   user.delete().then(function(){
       //usuario borrado
   }).catch(function(error){
    //Un error ocurrio
   }) 
}
}
