import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentesComponent } from './agentes.component';
import { PerfilagentesComponent } from './perfilagentes/perfilagentes.component';
import { NotificacionesagentesComponent } from './notificacionesagentes/notificacionesagentes.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { FechaHitoAgentesComponent } from './fecha-hito-agentes/fecha-hito-agentes.component';
import { InventarioagentesComponent } from './inventarioagentes/inventarioagentes.component';
const routes: Routes = [
  {
    path:'',
    component:AgentesComponent,
    children: [ 
      {
        path:'Perfil',
        component: PerfilagentesComponent,
      },
      {
        path:'Notificaciones',
        component: NotificacionesagentesComponent,
      },
      {
        path:'Calendario',
        component: CalendarioComponent,
      },
      {
        path: 'Hitoagente', 
        component: FechaHitoAgentesComponent,
      },
      {
        path: 'Inventario', 
        component: InventarioagentesComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentesRoutingModule { }
