import { dataProduct } from "./js/data.js"
import "./js/events.js"

const Discover = document.getElementById("Discover")
const grid_Category = document.getElementById("Category")
const grid_Shop = document.querySelector(".gridShop")
const buy = document.querySelector(".buy")
const cart_Shop = document.querySelectorAll(".cartShop")

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function print() {
    let html = ""
    dataProduct.forEach(({ id, name, urlImages, stock, price }) => {
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

function categoryPrint(e) {
    let html = ""
    let Oncategory = removeAccents(e.target.textContent.toLowerCase())
    dataProduct.forEach(({ id, name, urlImages, stock, price, category }) => {
        for (const item of category) {
            if (item === Oncategory) {
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
    if (e.target.parentElement.lastElementChild.innerHTML != "" && e.target.classList.contains("articleBox")) {
        e.target.parentElement.lastElementChild.innerHTML = ""
    }
    else if (e.target.classList.contains("articleBox")) {
        e.target.parentElement.lastElementChild.innerHTML = html
    }
    callBtnBuy()
}

function callBtnBuy() {
    const btn_Buy = document.querySelectorAll(".buyInfo")
    for (let i = 0; i < btn_Buy.length; i++) {
        btn_Buy[i].addEventListener("click", printToCart)
    }
}


let objCart = {}

function printToCart(e) {
    let html = ""
    if (!e.target.hasAttribute("src")) { return }
    let abuelo = e.target.parentElement.parentElement.parentElement
    let idProduct = Number(abuelo.id)
    let product = dataProduct.find((producto) => producto.id === idProduct)

    if (product.stock >= 1) {
        console.log("Si hay stock")
        if (objCart[idProduct]) {
            objCart[idProduct].amount += 1
            objCart[idProduct].stock -= 1
        }
        else {
            objCart[idProduct] = product
            objCart[idProduct].amount = 1
            objCart[idProduct].stock -= 1
        }
    }
    else { alert("No tenemos más stock!") }


    let arrayCart = Object.values(objCart)
    arrayCart.forEach(({ id, urlImages, name, price, amount, stock }) => {
        html += `
            <div class="productShop">
                <div class="imageShop"><img src="${urlImages}" alt="${name}"></div>
                <div class="infoShop">
                    <p>Precio: <span>${price}$</span></p>
                    <p>Unidades: <span>${amount}</span></p>
                    <p>Subtotal: <span>${amount * price}$</span></p>
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


    callBtnShop()
}

function printPrice(objCart) {
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

function callBtnShop() {
    const btn_shop = document.querySelectorAll(".btn-btnsShop")
    for (let i = 0; i < btn_shop.length; i++) {
        btn_shop[i].addEventListener("click", function (e) {
            if (e.target.classList.contains("btn-plus")) {
                let idProduct = Number(e.target.parentElement.id)
                let product = dataProduct.find((producto) => producto.id === idProduct)
                if (product.stock >= 1) {
                    if (objCart[idProduct]) {
                        objCart[idProduct].amount += 1
                        objCart[idProduct].stock -= 1
                    }
                }
                else { alert("No tenemos más stock!") }
                e.target.parentElement.previousElementSibling.innerText = `Stock: ${objCart[idProduct].stock}`
                let info = e.target.parentElement.parentElement.previousElementSibling
                info.innerHTML = `
                    <p>Precio: <span>${objCart[idProduct].price}$</span></p>
                    <p>Unidades: <span>${objCart[idProduct].amount}</span></p>
                    <p>Subtotal: <span>${objCart[idProduct].amount * objCart[idProduct].price}$</span></p>
                `
                
            }
            if (e.target.classList.contains("btn-minus")) {
                let idProduct = Number(e.target.parentElement.id)
                let product = dataProduct.find((producto) => producto.id === idProduct)
                if (product.amount > 0) {
                    if (objCart[idProduct]) {
                        objCart[idProduct].amount--
                        objCart[idProduct].stock++
                    }
                }
                else { alert("No tienes más unidades!") }
                e.target.parentElement.previousElementSibling.innerText = `Stock: ${objCart[idProduct].stock}`
                let info = e.target.parentElement.parentElement.previousElementSibling
                info.innerHTML = `
                    <p>Precio: <span>${objCart[idProduct].price}$</span></p>
                    <p>Unidades: <span>${objCart[idProduct].amount}</span></p>
                    <p>Subtotal: <span>${objCart[idProduct].amount * objCart[idProduct].price}$</span></p>
                `
            }
            if (e.target.classList.contains("btn-delete")) {
                let idProduct = Number(e.target.parentElement.id)
                delete objCart[idProduct]
                let html = ""
                let arrayCart = Object.values(objCart)
                arrayCart.forEach(({ id, urlImages, name, price, amount, stock }) => {
                    html += `
                        <div class="productShop">
                            <div class="imageShop"><img src="${urlImages}" alt="${name}"></div>
                            <div class="infoShop">
                                <p>Precio: <span>${price}$</span></p>
                                <p>Unidades: <span>${amount}</span></p>
                                <p>Subtotal: <span>${amount * price}$</span></p>
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
                callBtnShop()
            }   
            printPrice(objCart)
        })
    }
}

// ataca al data para el stock

grid_Category.addEventListener("click", categoryPrint)

buy.addEventListener("click", function (e) {
    if (e.target.textContent === "Cancelar") { grid_Shop.innerHTML = ""; objCart = {} }
    if (e.target.textContent === "Comprar" && Object.keys(objCart).length != 0) { grid_Shop.innerHTML = ""; objCart = {}; alert("Gracias por su compra") }
    for (let i = 0; i < cart_Shop.length; i++) {
        cart_Shop[i].children[1].lastElementChild.innerText = "0$"
        cart_Shop[i].children[2].lastElementChild.innerText = "0$"
    }
})

const main = document.querySelector(".main")
const shoping = document.querySelector(".shoping")
const open_Cart = document.getElementById("openCart")
open_Cart.addEventListener("click", function(){
    console.log(Object.keys(objCart).length === 0);
    main.classList.toggle("activate")
    this.parentElement.classList.toggle("activate")
    shoping.classList.toggle("activate")
    if(Object.keys(objCart).length === 0){
        console.log("objcart");
        shoping.lastElementChild.classList.remove("activate")
    }
    else{
        shoping.lastElementChild.classList.add("activate")
    }
})

print()


