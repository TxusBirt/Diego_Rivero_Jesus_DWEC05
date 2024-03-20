// Clase que se utiliza de modelo de datos.
// con los atributos que corresponden con los 
// datos que se quieren guardar
export class Configuracion {
    constructor(
        public nombre:string,
        public apellido:string,
        public rango: number,
        public intentos: number,
        public numeroAleatorio:number
    ){}
}