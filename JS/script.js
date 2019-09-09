let photos = document.querySelector('#photos')
let people = document.querySelector('#people')
let person = document.querySelector('#person')
let header = document.querySelector('#Options')
const API = 'https://randomuser.me/api/?results=52';
let results={};
let countApiCall=0;


//llamamos la api y pedimos traer la info en json
function queryAPI () {
    fetch(API).then((value) =>{        
        return value.json();
    }).then((value) => { 
        countApiCall++;    
        results = prepData(value.results,countApiCall); 
        createPhoto(results,countApiCall); 
    }).catch(err => {
        console.log(err)
    })    
}

//iniciamos la vista
queryAPI()

function prepData(data, numCall= 0) { 
    let cont=0;
    for (let index = numCall*52-52; index < Object.keys(data).length + numCall*52-52; index++) {
        // results = {...results,...data[index]};  
        results[index] = data[cont];
        console.log(`Insertion:${index} == ${data[cont]}`);
        cont++;
    }
    return results
}

//se genera la imagen
function createPhoto(data, numCall= 0) {   

    for (let index = numCall*52-52; index < Object.keys(data).length + numCall*52-52; index++) {    
        let article = document.createElement('article')
        article.classList.add("article-persona");
        let nameImg = document.createElement('div')
        let imagen = document.createElement('img')
        let clickImage = document.createElement('a')

        // traemos la información
        let location = data[index].location.street
        let city = data[index].location.city
        let phone = data[index].phone

        // generamos las caracteristicas que tendrá la imagen
        nameImg.innerHTML = data[index].name.first       
        imagen.src = data[index].picture.large
        imagen.alt = data[index].name.first
        imagen.className = data[index].name.first
        clickImage.href = data[index].picture.large
        clickImage.id = data[index].name.first
        
        // de esta forma veremos la información con la imagen
        imagen.id = index;
        article.appendChild(imagen)
        article.appendChild(nameImg)        
        photos.appendChild(article)
        header.appendChild(clickImage)               
    }

}

//le damos acción para traer 1 sola imagen
photos.addEventListener('click', selectImage, false);

//creamos función para capturar la información en un tarjeta
function selectImage(event) {   
    if (event.target !== event.currentTarget) {         
        people.style.display= "none";
        person.style.display= "block";

        let imgSelected = document.querySelector('#imgSelected')        
        let name = document.querySelector('#name')
        let email = document.querySelector('#email')
        let gender = document.querySelector('#gender')
        let phone = document.querySelector('#phone')
        
        //traemos la imagen
        let index = event.target.getAttribute('id');        
        imgSelected.src = results[index].picture.large

        name.innerHTML = `Name: ${results[index].name.first}` 
        email.innerHTML = `Email: ${results[index].email}`
        gender.innerHTML = `Gender: ${results[index].gender}`      
        phone.innerHTML = `Phone: ${results[index].phone}`     

    } event.stopPropagation();
}

function retornHome(event){
    people.style.display= "block";
    person.style.display= "none";
}

//se dan propiedades al infinte scroll

window.onscroll = function() {    
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {            
        queryAPI()
    }
};  

var imagenes=document.getElementsByTagName("img");
for(var i=0;i<imagenes.length;i++)
{
 
	// Creamos el evento mouseover para cada imagen
	imagenes[i].addEventListener("mouseover", function(e){
		document.getElementById("photos").style.backgroundImage="url('"+e.target.currentSrc+"')";
	});
 
	// Creamos el evento mouseout para cada imagen
	imagenes[i].addEventListener("mouseout", function(e){
		document.getElementById("photos").style.backgroundImage="";
	});
}
//
