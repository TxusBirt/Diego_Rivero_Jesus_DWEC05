import { Component } from '@angular/core';
import { Configuracion } from './modelo/Configuracion';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet,FormsModule,CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    //Datos juego que son los que necesito para guardar en el modelo de datos
    protected nombre:string="";
    protected apellido:string="";
    protected intento:number=0;
    protected rango:number=0;
    protected numeroAleatorio:number=0;
    //Modelo de datos donde guardaré los datos obtenidos de la interfaz
    protected miUsuario:Configuracion;
    // Número que introduce el usuario
    protected numUsuario=-1;
    // Mensaje de texto que indica en pantalla si aciertas o no
    protected mensaje:string="";
    // Propiedades para controalr elementos de la interfaz
    // Propiedad que indica si el juego está o no activo
    // cuando está activo también se utiliza para bloquear los elementos de insercion de datos
    protected activarJuego:boolean=false;
    // Propiedad que indica si se acierta
    protected acierto:boolean=false;
    // Propiedad que bloquea los elementos del juego una vez han aparecido
    protected bloqueado:boolean=true;
    // array donde se guardan los números introducidos
    protected numeros: Array<number>;
    constructor(){
        // Inicializo array de números introducidos 
        this.numeros=[];
        // Inicializo objeto de clase configuración
        this.miUsuario=new Configuracion(this.nombre, this.apellido,  this.rango, this.intento,this.numeroAleatorio);
    }
    // Método para agregar los datos introducidos por interfaz
    // activa el juego cuando los datos se introducen de forma correcta
    protected agregarUsuario():void{
        // Valido que introduzco  los datos solicitados
        if (this.nombre=="" || this.apellido=="" ||  this.rango==0 || this.intento==0 ||
            this.rango==null || this.intento==null) {
            alert ("Faltan datos por rellenar");
          // Valido que los números de rango e intentos sean enteros positivos, 
          // ya que se pueden introducir incorrectamente de forma manual
        } else if (!Number.isInteger(this.rango) || this.rango < 0 || 
                    !Number.isInteger(this.intento) || this.intento< 0) {
            alert ("Números introducidos no son correctos.\nDebe introducir números enteros y positivos");
          // inicializo el juego
        } else {
            // Asigno un valor aleatorio a la propiedad para definir el número a acertar
            this.numeroAleatorio=Math.floor(Math.random()*(this.rango+1))
            // Guardo los datos introducidos por interfaz en objeto de clase Configuracion
            this.miUsuario = new Configuracion(this.nombre, this.apellido,  this.rango, this.intento,this.numeroAleatorio);
            console.log(this.miUsuario);
            // activo el juego y a su vez bloqueo los elementos donde introduje los datos
            this.activarJuego=true;
            // desbloqueo elementos de interfaz del juego
            this.bloqueado=false;
        }
    }
    // metodo que se activa cuando pulsamos el boton d eenviar el número que introducimos
    // determina si el numero introducido es igal al buscado
    protected adivinarNumero():void {
        // condicional pra que sólo se active el juego cuando los datos se
        // introduzcan correctamente
        if (this.activarJuego) {
            // valido que el formulario no esté vacio
            if (this.numUsuario==null) {
              alert ("No se ha introducido ningún número. Introduzca un número");
              // condición que establece un alert si el número introducido está fuera de rango
            } else if (this.numUsuario < 0 || this.numUsuario > this.rango || this.numUsuario==null) {
                alert (`Número fuera de rango, elija otro número en el rango: 0 - ${this.rango}`);
                // si el número está dentro del rango valido que sea entero ya que
                // positivo tiene que ser si no saldrá el alert anterior
            } else if (!Number.isInteger(this.numUsuario)) {
                alert ("Número introducido no valido. El número debe ser entero");
            } else {
                  // establece lo que ocurre cuando no se acierta y quedan intentos
                  if (this.miUsuario.intentos > 0 && this.acierto == false) {
                      // se resta un intento por cada vez que no se acierte
                      this.miUsuario.intentos -= 1;
                      // no se acierta el número
                      if (this.numeroAleatorio != this.numUsuario) {
                          this.mensaje="No";
                          this.numeros.push(this.numUsuario);
                           // una vez se finaliza el juego se bloquea la interfaz del mismo
                          if (this.miUsuario.intentos == 0) {
                            this.bloqueado = true;
                          }
                    //se acierta con el número buscado
                  } else if (this.numeroAleatorio == this.numUsuario) {
                      this.mensaje="Sí";
                      this.numeros.push(this.numUsuario);
                      this.acierto=true;
                       // una vez se finaliza el juego se bloquea la interfaz del mismo
                      this.bloqueado = true;
                  } 
                  // condicion cuando se ha finalizado el juego
                  // o porque se finalizan los intentos o por adivinar el número
                  } 
            }
        }
    }
    // metodo que responde al evento de volver a jugar
    protected recargarPagina():void {
        // recargo la página
        window.location.reload();
    }
}

