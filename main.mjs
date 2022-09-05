import {dataProduct} from "./js/data.js"
import "./js/events.js"

const Discover = document.getElementById("Discover")
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

function print(){
    let html = ""
    dataProduct.forEach(({id,name,urlImages,stock,price}) => {
        html += `
        <div class="productGrid " id="${id}">
            <img src="${urlImages}" alt="noche">
            <i class="em em-hearts" aria-role="presentation" aria-label="BLACK HEART SUIT"></i>
            <div class="infoProduct fuente2">
                <h2>${name}</h2>
                <p>Precio: ${price}$</p>
                <p>Stock: ${stock}</p>
            </div>
        </div>
        `
    })
    Discover.innerHTML = html
}

print()

function categoryPrint(e){
    let html = "" 
    let Oncategory = removeAccents(e.target.textContent.toLowerCase())
    dataProduct.forEach(({id,name,urlImages,stock,price,category}) => {
        for (const item of category) {
            if(item === Oncategory){
                console.log("toy dentro");
                html += `
                    <div class="productGrid " id="${id}">
                        <img src="${urlImages}" alt="noche">
                        <i class="em em-hearts" aria-role="presentation" aria-label="BLACK HEART SUIT"></i>
                        <div class="infoProduct fuente2">
                            <h2>${name}</h2>
                            <p>Precio: ${price}$</p>
                            <p>Stock: ${stock}</p>
                        </div>
                    </div>
                `
            }
        }
    })
    if(e.target.parentElement.lastElementChild.innerHTML!="" && e.target.classList.contains("articleBox")){
        e.target.parentElement.lastElementChild.innerHTML = ""
    }
    else if(e.target.classList.contains("articleBox")){
        e.target.parentElement.lastElementChild.innerHTML = html
    }
}

const grid_Category = document.getElementById("Category")

grid_Category.addEventListener("click", categoryPrint)