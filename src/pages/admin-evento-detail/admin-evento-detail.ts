import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventosServiceProvider } from "../../providers/eventos-service/eventos-service";


@IonicPage()
@Component({
  selector: 'page-admin-evento-detail',
  templateUrl: 'admin-evento-detail.html',
})
export class AdminEventoDetailPage {
  evento: any = { id: null, title: null, description: null};
  id = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventoService: EventosServiceProvider ) {
                this.id = navParams.get('id');
                if(this.id != 0){
                //this.evento = eventoService.getEvento(this.id);
                 eventoService.getEvento(this.id)
                              .valueChanges().subscribe(evento=>{
                                this.evento = evento;
                              });
                }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEventoDetailPage');
  }
  addEvento(){
    this.evento.id = Date.now();
    if(this.id != 0){
      this.eventoService.editEvento(this.evento);
      alert('Editado');
    }else{
    this.eventoService.createEvento(this.evento);
    alert('Evento Creado');
  }
  this.navCtrl.pop();

}
deleteEvento(){
  this.eventoService.deleteEvento(this.evento);
  alert('Evento eliminado');
  this.navCtrl.pop();
}

}
