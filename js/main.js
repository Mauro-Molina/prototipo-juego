//Agreagar un evento click al boton
let btnStart = document.querySelector(".start")
console.log(btnStart)

btnStart.addEventListener("click", () =>{
    console.log("Inicia el juego")
    clearInterval()
    iniciarJuego()
})
//Seleccionar el canvas
let lienzo = document.getElementById("lienzo")
let ctx = lienzo.getContext("2d")

//lista de enemigos / huesos y cactus
const nopalitos = []
const huesos = []
let idInterval

//imagenes
const trexito = new Image()
trexito.src = "/images/trex1.webp"
console.log(trexito)

const CactusImg = new Image()
CactusImg.src = "../images/cactus1.webp"
let contador = 0

const huesoImg = new Image()
huesoImg.src = "../images/hueso.png"

const cero = new Image()
cero.src = "../images/gif/0.gif"

const uno = new Image()
uno.src = "../images/gif/1.gif"

const dos = new Image()
dos.src = "../images/gif/2.gif"

const tres = new Image()
tres.src = "../images/gif/3.gif"

const cuatro = new Image()
cuatro.src = "../images/gif/4.gif"

const cinco = new Image()
cinco.src = "../images/gif/5.gif"

const seis = new Image()
seis.src = "../images/gif/6.gif"

const siete = new Image()
siete.src = "../images/gif/7.gif"

//arreglos de imagenes
const sprites = [cero, uno, dos, tres, cuatro, cinco, seis, siete]
let posicion = 0

//generar el personaje --> clase
class Trex{
    constructor(x, y, w, h, color, vida, imagen){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color 
        this.vida = vida
        this.imagen = imagen
        this.saltando = false
        this.score = 0
    }

    avanzar(){
        //console.log("Avanzar")
        if(this.x < 300){ 
            this.x += 10;
        }
       
    }

    retroceder(){
        console.log("retroceder")
        if(  this.x > 0){
            this.x -= 10
        }
    }
    saltar(){
        console.log("Saltar")
        if(this.x < 350){ 
            this.saltando = true
        }
    }
    agacharse(){
        console.log("Agacharse")
    }
    dibujarse(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h)
       
    }
    morirse(){

    }
    disparar(){
        console.log("Dispara")
        const huesito = new Hueso(this.x+this.w, this.y+10, 20, 40, huesoImg)
        huesos.push(huesito)
    }

}

//clase huesos
class Hueso{
    constructor(x,y,w,h,imagen){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.imagen = imagen
    }
    dibujarse(){
        ctx.fillStyle = ""
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h)
         this.x += 3
    }
}


//generar enemigo(captus)
class Cactus{
    constructor(x,y,w,h,imagen){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.imagen = imagen
    }
    dibujarse(){
        ctx.fillStyle = ""
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h)
        if(this.nivel === "facil"){
            this.x -= 1
        }else{
            this.x -= 3
        }
    }
}

//dibujar linias 

function dibujarpiso (){
    ctx.beginPath()
    ctx.moveTo(0,180)
    ctx.lineTo(410,180)
    ctx.stroke()
    ctx.closePath()
}

dibujarpiso()


/*-------------------------------------*/

//Mostrar el nombre del juego

function mostrarDatos(distancia, score, vidas){
    ctx.fillStyle = "#000"
    ctx.font = "30px Arial"
    ctx.fillText("Trexsito", 160, 30)
    //distancia
    ctx.fillText(`${distancia} m`, 20, 30)
    //score
    ctx.fillText(`Score: ${score}`, 280, 30)
    ctx.fillText(`Vida: ${vidas}`, 280, 60)
}



/*-------------------------------------*/

//Escuche las teclas

function teclas(dinosaurio){
    document.addEventListener("keyup", (evento) =>{
        //console.log("Arriba", evento.code)
        switch(evento.code){
            case "KeyI":{
                dinosaurio.disparar()
                break;
            }
            case "Space":
                console.log("Brincar")
                dinosaurio.saltar()
                break
            case "ArrowRight": 
                //console.log("Adelante")
                dinosaurio.avanzar()
                
                break
            case "ArrowLeft": 
                dinosaurio.retroceder()
              
                break
            case "ArrowDown": 
                console.log("Abajo")
                break
            case "ArrowUp": 
                console.log("Arriba")
                break
        }
    })
}


//crear enemigos
function crearCactus(){
    const num = Math.floor(Math.random() * 100)
    if (num === 3){
        const captus = new Cactus(310,130,30,50, CactusImg,"facil")
        nopalitos.push(captus)
    }
}

/*-------------------------------------*/

//Inicio del Juego

function iniciarJuego(){
    let distacia = 0
    const dinosaurio = new Trex(20,130,30,40,"",100,cero)
    teclas(dinosaurio)
    dinosaurio.dibujarse();

    

    idInterval = setInterval(()=>{
        ctx.clearRect(0,0,410,210)
        //MostrarDatos
        mostrarDatos(distacia, dinosaurio.score, dinosaurio.vida)
        distacia +=1

        dibujarpiso()
        dinosaurio.imagen = sprites[posicion]
        posicion++
        if(posicion === 7){
            posicion = 0
        }
        dinosaurio.dibujarse()
        //captus.dibujarse()

        //esta saltando ???
        if(dinosaurio.saltando === true){
            console.log("saltando");
            //alt max
            if(dinosaurio.y > 50){
                dinosaurio.y -= 15
            }else{
                dinosaurio.saltando = false
            }
           
        }
        
        if(dinosaurio.saltando === false && dinosaurio.y < 130){
            dinosaurio.y += 15
        }

        //Dibujar enemigos
        nopalitos.forEach((cactus, index) =>{
            cactus.dibujarse()
            if(cactus.x <= dinosaurio.x+dinosaurio.w && cactus.x >= dinosaurio.x + dinosaurio.h){

            }
            if(cactus.x <= dinosaurio.x+dinosaurio.w && 
                cactus.x >= dinosaurio.x && 
                cactus.y <= dinosaurio.y + dinosaurio.h){
                //eliminar elemento
                //array.splice
                nopalitos.splice(index,1)
                dinosaurio.vida -=25
                if (dinosaurio.vida < 25){
                    alert("FIn del juego")
                    clearInterval(idInterval)
                }else{

                }
                
            }
        })

        //Proyectil
    huesos.forEach((hueso, hIndex) => {
        hueso.dibujarse();
        nopalitos.forEach((cactus, cIndex) => {
          // console.log("posicion x cactus", cactus.x, " - ", hueso.x);
          if (hueso.x + hueso.w >= cactus.x) {
            // quitar el hueso y el cactus
            huesos.splice(hIndex, 1);
            nopalitos.splice(cIndex, 1);
            dinosaurio.score += 1;
          }
        });
      });

        crearCactus()
    },1000 /30 )


}

//iniciarJuego()

//Agregar pagina de inicio --> listo
//agregar la imagen trex --> listo
//crear captus --> listo
//brincar --> listo
//recibir daño -->listo
//contador de metros --> listo
//score
//perder
//trex dispare -->dispareg
//Agregar sonido
//ganar 
//reiniciar juego