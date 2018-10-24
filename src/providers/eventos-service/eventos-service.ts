import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class EventosServiceProvider {
  constructor(public afDB: AngularFireDatabase){}
   eventos=[];

  // eventos=[
  //   {id:1, title:'Evento 1', description:'Descripcion 1'},
  //   {id:2, title:'Evento 2', description:'Descripcion 2'},
  //   {id:3, title:'Evento 3', description:'Descripcion 3'}
  //
  // ];
  public getEventos(){
    //return this.eventos;
    return this.afDB.list('eventos/');
  }
  public getEvento(id){
    //return this.eventos.filter(function(e, i){ return e.id == id })[0] || {id: null, title:null, description:null};
    return this.afDB.object('eventos/'+id);
  }
  public createEvento(evento){
    //this.eventos.push(evento);
    this.afDB.database.ref('eventos/'+evento.id).set(evento);

  }
  public editEvento(evento){
    // for(let i = 0; i < this.eventos.length; i++){
    //   if(this.eventos[i].id == evento.id){
    //     this.eventos[i] = evento;
    //   }
    // }
    this.afDB.database.ref('eventos/'+evento.id).update(evento);

  }
  public deleteEvento(evento){
    // for(let i = 0; i < this.eventos.length; i++){
    //   if(this.eventos[i].id == evento.id){
    //     this.eventos.splice(i, 1);
    //   }
    // }
    this.afDB.database.ref('eventos/'+evento.id).remove(evento);

  }
}
