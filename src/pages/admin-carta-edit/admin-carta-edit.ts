import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartaAddProvider } from '../../providers/carta-add/carta-add';
import { CartaItem } from "../../providers/carta-add/CartaItem";
import { ToastProvider } from '../../providers/toast/toast';
import { AngularFireDatabase } from '@angular/fire/database';




@IonicPage()
@Component({
  selector: 'page-admin-carta-edit',
  templateUrl: 'admin-carta-edit.html',
})
export class AdminCartaEditPage {
  cartaItem: CartaItem={
    titulo: this.crPr.selectedProduct.titulo,
    precio: this.crPr.selectedProduct.precio,
    categoria: this.crPr.selectedProduct.categoria,
    nota: this.crPr.selectedProduct.nota,
    img: this.crPr.selectedProduct.img
  }; 
// $key: string;

data:any = {};

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private crPr: CartaAddProvider,
               private toastCtrl: ToastProvider,
               private DB: AngularFireDatabase ) {

                this.crPr.selectedProduct.$key;

                this.crPr.selectedProduct.titulo;
                this.crPr.selectedProduct.categoria;
                this.crPr.selectedProduct.precio;

                console.log(this.crPr.selectedProduct.titulo);
                
               }
               
  ionViewDidLoad(){
    this.cartaItem = this.navParams.get('cartaItem');
  }
  SaveCartaItem(cartaItem : CartaItem){  
    
    console.log(cartaItem);
    
    this.data = {

      name: this.crPr.selectedProduct.titulo,
      precio: this.crPr.selectedProduct.precio,
      categoria: this.crPr.selectedProduct.categoria,
      KEY: this.crPr.selectedProduct.$key      

    }

    console.log(this.data);
    this.crPr.updateCarta(this.data).then(ref =>{
      this.toastCtrl.show(`${this.data.name} Edited!`)
     //this.navCtrl.setRoot('AdminCartaHomePage', {$key: ref.$key});
     this.navCtrl.pop();
     })
     
    //console.log(this.crPr.selectedProduct.$key);
    
  }
  
    
  
    
  
}
