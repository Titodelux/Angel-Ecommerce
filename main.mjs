import {dataProduct} from "./js/data.js"
import "./js/events.js"

const gridDiscover = document.getElementById("Discover")

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
    gridDiscover.innerHTML = html
}

print()

// function categoryPrint(e){
//     let html = ""
//     let category = `${e.target.textContent}`
//     console.log(e.target.textContent);
// }

// console.log(grid_Category)