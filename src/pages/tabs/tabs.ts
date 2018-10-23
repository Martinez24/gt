import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
//Paginas que conforman el tabs
import { HomePage } from '../home/home';
import { EventosPage } from '../eventos/eventos';
import { Reservacion_1Page } from '../reservacion-1/reservacion-1';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = HomePage;
  tab2 = EventosPage;
  tab3 = Reservacion_1Page;

  constructor() {
  }


}
