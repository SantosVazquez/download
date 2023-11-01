import { Component, OnInit, Renderer2 } from '@angular/core';
import { ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { inmueblesBuscados } from 'src/app/services/Interface/Interfaces';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-vistadeinmueble',
  templateUrl: './vistadeinmueble.component.html',
  styleUrls: ['./vistadeinmueble.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in => out', animate('200ms ease-out')),
      transition('out => in', animate('200ms ease-in')),
    ]),
  ],

})

export class VistadeinmuebleComponent implements OnInit {
  ///////// NO MOVER LA FUNCION DE OCULTAR Y MOSTRAR LAS LISTAS DE LOS BOTONES DE LA BUSQUEDA ///////////////
  paginaActual = 1; // Página actual
  elementosPorPagina = 8; // Número de elementos por página

  panelOpenState = false;
  
  showPrecio: boolean = false;
  showToferta: boolean = false;
  showInmueble: boolean = false;
  showRecamaras: boolean = false;
  showFilters: boolean = false;

  togglePrecio(){
    this.showPrecio = !this.showPrecio;
    // Cierra los otros elementos
    this.showToferta = false;
    this.showInmueble = false;
    this.showRecamaras = false;
    this.showFilters = false;
  }
  toggleToferta(){
    this.showToferta = !this.showToferta;
     // Cierra los otros elementos
    this.showPrecio = false;
    this.showInmueble = false;
    this.showRecamaras = false;
    this.showFilters = false;
  }
  toggleInmueble(){
    this.showInmueble = !this.showInmueble;
    // Cierra los otros elementos
    this.showPrecio = false;
    this.showToferta = false;
    this.showRecamaras = false;
    this.showFilters = false;
  }
  toggleRecamaras(){
    this.showRecamaras = !this.showRecamaras;
    // Cierra los otros elementos
    this.showPrecio = false;
    this.showToferta = false;
    this.showInmueble = false;
    this.showFilters = false;
  }
  toggleFilters() {
    this.showFilters = !this.showFilters;
    // Cierra los otros elementos
    this.showPrecio = false;
    this.showToferta = false;
    this.showInmueble = false;
    this.showRecamaras = false;
  }
  

  ///////////////////////////////////////////// AQUI TERMINA XD //////////////////////////////////////
  control = new FormControl('');
  

  firstFormGroup!: FormGroup;
  precios!: FormGroup
 // registerForm: FormGroup;
  
  datosInmueble: inmueblesBuscados[] = [];
  /*datosMunicipios  llena la lista de busqueda de todos los municipios*/
  datosMunicipios: any[] = [];
  /*datosTipoInmueble llena el comboBox con los tipos de inmuebles */
  datosTipoInmueble: any[] = [];
  /*municipios almacena el valor del municpio= San Martin Tex,etc */
  municipios = '';
  /*tipoinmuebles almacena el valor del tipo de inmueble casa, departamento, etc. */
  tipoinmuebles = '';
 /*Almacena el id del municipio sleccionado*/
  estadoSeleccionado:any | null ='';
  /*Almacena el id del tipoInmueble*/
  seleccionIdTipoInmueble:any | null='';

  inmueble: any = {
    ubicacion: '',
    recamaras: '',
    inmueble: '',
    precioHasta: '',
    precioDesde: '',
    tipoAccion: '',
    bano:'',
    estacionamiento:''
    

  }

  title = 'ProyectoPrueba';


  selectedValue = '';
  municipioSeleccionado: string = '';
  // Definir un arreglo de opciones


  action: String | undefined;
  tpropiedad!: Number;
  ubicacion!: String;

  tippropiedad: String | undefined;



  constructor(private el: ElementRef, private router: Router, private http: HttpService, private renderer: Renderer2, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    
  }

  
  detalles(id_inmu: any, id_usu : any) {

    //console.log(id_inmu,id_usu);
    this.router.navigate(['/inmueble/detalles'], { queryParams: { 'id_inmueble': id_inmu, 'id_usuario': id_usu, 'tpropiedad' : this.tpropiedad, 'ubicacion' : this.ubicacion } });

  }


  

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      console.log('Query Params: ', params);

      this.action = params['action'];
      this.tpropiedad = params['tpropiedad'];
      this.ubicacion = params['ubicacion'];

      console.log('Action: ', this.action);
      console.log('Propiedad: ', this.tpropiedad);
      console.log('Ubicacion: ', this.ubicacion);

    });

    this.firstFormGroup = this.formBuilder.group({
      ubicacion: ['',[Validators.required]],
      Id_Tipo_Inmueble: ['', [Validators.required]],
      pAccion :['', [Validators.required]],
      pRecamaras: ['', [Validators.required]]
      

    });
    this.precios = this.formBuilder.group({
      pDesde: ['',[Validators.required]],
      pHasta: ['',[Validators.required]]
    })

    
    

    this.http.mostrarInmuebles(this.ubicacion, this.tpropiedad).subscribe((resp: any) => {

      this.datosInmueble = resp;
      
    }); 

    this.http.busquedaAvanzada('',this.tpropiedad,'','','','',this.ubicacion).subscribe((data:any)=>{
      
      this.datosInmueble = data;

    });


    this.http.mostrarTipoInmueble().subscribe((data: any) => {

      this.datosTipoInmueble = data;

    });

   

    //let datosBusqueda = 


  }

  ResultadoosBusquedaC() {
    this.router.navigate(["/inmueble/vista"], { queryParams: { 'action': 'compra', 'tpropiedad': this.tpropiedad, 'ubicacion': this.ubicacion} });
  }

  mostrarMunicipios() {
    this.http.mostrarMunicipios(this.municipios).subscribe((data: any) => {

      this.datosMunicipios = data;

    });
  }

  mostrarIDMunicipio(id: number): void {
    console.log(id);
  }

 



  seleccionarMunicipio(municipios: string) {
    this.municipioSeleccionado = municipios;

    console.log(municipios);
  
  }
  back() {
    this.router.navigate(["/web"]);
  }
  /*botonSeleccionado(opcion:number){
    console.log( 'El usuario mostro:'opcion );
  }*/

  mostrar() {


    this.datosInmueble = [];

    this.http.busquedaAvanzada(this.inmueble.ubicacion, this.inmueble.inmueble , '2',  '', '', '', this.ubicacion).subscribe((data: any) => {

      /*let mostrar = JSON.stringify(data);
      alert(mostrar);*/
      //console.log(this.inmueble);

    data= this.datosInmueble ;

  


      /*this.http.busquedaAvanzada(this.data.ubicacion,'',this.data.tpropiedad,'','','','',this.data.action,'','').subscribe((data: any) => {
        let mostrar = JSON.stringify(data);
        alert(mostrar);

      location.reload();
    
      this.datosInmueble =[];*/

                });
              
    }
//Muestra la seleccion del select**
    cambioTpropiedad(tprop:string){
      console.log('Selecciona Propiedad: ',tprop);
      this.tippropiedad = tprop;

}


/// este es el codigo del paginador de los resultados///
paginaAnterior() {
  if (this.paginaActual > 1) {
    this.paginaActual--;
    this.scrollToTop(); 
  }
}

paginaSiguiente() {
  if (this.paginaActual < this.totalPaginas()) {
    this.paginaActual++;
    this.scrollToTop(); 
  }
}

totalPaginas(): number {
  return Math.ceil(this.datosInmueble.length / this.elementosPorPagina);
}
scrollToTop() {
  window.scrollTo(0, 0);
}

/// aqui termina el codigo del paginador de los resultados///

}
