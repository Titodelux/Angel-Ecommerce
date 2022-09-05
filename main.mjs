import {dataProduct} from "./js/data.js"
import "./js/events.js"

const Discover = document.getElementById("Discover")
const grid_Category = document.getElementById("Category")
const grid_Shop = document.querySelector(".gridShop")
const buy = document.querySelector(".buy")
const cart_Shop = document.querySelectorAll(".cartShop")
// const btn_shop = document.querySelectorAll(".btn-btnsShop")


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
                <div class="buyInfo">
                    <p>Stock: ${stock}</p>
                    <img src="./images/shopping-cart.png" alt="Comprar">
                </div>
            </div>
        </div>
        `
    })
    Discover.innerHTML = html
    callBtnBuy()
}

function categoryPrint(e){
    let html = "" 
    let Oncategory = removeAccents(e.target.textContent.toLowerCase())
    dataProduct.forEach(({id,name,urlImages,stock,price,category}) => {
        for (const item of category) {
            if(item === Oncategory){
                html += `
                    <div class="productGrid " id="${id}">
                        <img src="${urlImages}" alt="noche">
                        <i class="em em-hearts" aria-role="presentation" aria-label="BLACK HEART SUIT"></i>
                        <div class="infoProduct fuente2">
                            <h2>${name}</h2>
                            <p>Precio: ${price}$</p>
                            <div class="buyInfo">
                                <p>Stock: ${stock}</p>
                                <img src="./images/shopping-cart.png" alt="Comprar">
                            </div>
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
    callBtnBuy()
}

function callBtnBuy(){
    const btn_Buy = document.querySelectorAll(".buyInfo")
    for (let i = 0; i < btn_Buy.length; i++) {
        btn_Buy[i].addEventListener("click", printToCart)
    }
}


let objCart = {}

function printToCart(e){
    let html = ""
    if(!e.target.hasAttribute("src")){return}
    let abuelo = e.target.parentElement.parentElement.parentElement
    let idProduct = Number(abuelo.id)
    let product = dataProduct.find((producto) => producto.id === idProduct)

    if(product.stock >= 1){console.log("Si hay stock")
        if (objCart[idProduct]){
            objCart[idProduct].amount += 1
            objCart[idProduct].stock -= 1
        }
        else {
            objCart[idProduct] = product
            objCart[idProduct].amount = 1
            objCart[idProduct].stock -= 1
        }
    }
    else {alert("No tenemos más stock!")}

    
    let arrayCart = Object.values(objCart)
    arrayCart.forEach(({id, urlImages, name, price, amount, stock}) => {
        html += `
            <div class="productShop">
                <div class="imageShop"><img src="${urlImages}" alt="${name}"></div>
                <div class="infoShop">
                    <p>Precio: <span>${price}$</span></p>
                    <p>Unidades: <span>${amount}</span></p>
                    <p>Subtotal: <span>${amount*price}$</span></p>
                </div>
                <div class="btns-shop">
                    <p>Stock: <span>${stock}</span></p>
                    <div class="btn-btnsShop" id="${id}">
                        <img src="images/add.png" alt="plus" class="btn-plus">
                        <img src="images/minus.png" alt="minus" class="btn-minus">
                        <img src="images/trash.png" alt="delete" class="btn-delete">
                    </div>
                </div>
            </div>
        `
    })
    grid_Shop.innerHTML = html
    printPrice(objCart)
}

function printPrice(objCart){
    let sumaProduct = null
    let sumaPrice = null
    for (const idProduct in objCart) { 
        sumaProduct += objCart[idProduct].amount
        sumaPrice += objCart[idProduct].amount * objCart[idProduct].price
    }
    for (let i = 0; i < cart_Shop.length; i++) {
        cart_Shop[i].children[1].lastElementChild.innerText = sumaProduct
        cart_Shop[i].children[2].lastElementChild.innerText = sumaPrice
    }
}


grid_Category.addEventListener("click", categoryPrint)

buy.addEventListener("click",function(e){
    console.log(e.target);
    if(e.target.textContent === "Cancelar"){grid_Shop.innerHTML = ""; objCart = {}}
    if(e.target.textContent === "Comprar"){grid_Shop.innerHTML = ""; objCart = {}; alert("Gracias por su compra")}
    for (let i = 0; i < cart_Shop.length; i++) {
        cart_Shop[i].children[1].lastElementChild.innerText = 0
        cart_Shop[i].children[2].lastElementChild.innerText = 0
    }
})

print()


