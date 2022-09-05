const open_Burger = document.getElementById("openBurger")
const close_Burger = document.getElementById("closeBurger")
const open_Favorite = document.getElementById("openFavorite")
const open_Perfil = document.getElementById("openPerfil")
const opcion = document.querySelectorAll(".btn-Foryou")
const grid_Discover = document.querySelector("#Discover")
const grid_Category = document.querySelector("#Category")
const btn_Slide = document.querySelector(".btn-slide")
const product_Promo = document.querySelectorAll(".productPromo")

open_Burger.addEventListener("click",(e) => {
    e.target.parentElement.children[1].style.transform = "translateX(0%)"
})

close_Burger.addEventListener("click",(e) => {
    e.target.parentElement.parentElement.style = "translateX(-100%)"
})

open_Favorite.addEventListener("click",(e) => {
    e.target.classList.toggle("em-hearts")
    e.target.classList.toggle("em-yellow_heart")
    e.target.parentElement.children[1].classList.toggle("activate")
})

open_Perfil.addEventListener("click", (e) => {
    e.target.parentElement.lastElementChild.classList.toggle("activate")
})

opcion[0].addEventListener("click",function(){
    opcion[0].classList.add("activate")
    opcion[1].classList.remove("activate")
    grid_Category.style = "display: none;"
    grid_Discover.style = "display: grid;"
})

opcion[1].addEventListener("click",function(){
    opcion[1].classList.add("activate")
    opcion[0].classList.remove("activate")
    grid_Discover.style = "display: none;"
    grid_Category.style = "display: grid;"
})

grid_Category.addEventListener("click", function(e){
    if(e.target.lastChild.getAttribute("src") === "images/down-arrow.png"){
        e.target.lastChild.setAttribute("src","images/up-arrow.png")
        e.target.lastChild.setAttribute("alt","Disminuir")
    }
    else{
        e.target.lastChild.setAttribute("src","images/down-arrow.png")
    }
})

let translate = null
btn_Slide.addEventListener("click", function(e){
    if(e.target.classList.contains("anterior")){translate++}
    
    if(e.target.classList.contains("siguiente")){translate--}

    for (let i = 0; i < product_Promo.length; i++) {
        product_Promo[i].style.cssText = `transform: translateX(${(i+translate)*(100)}%)`  
    }

    if(translate < -3){
        translate++
        product_Promo[3].style.cssText = `transform: translateX(-50%)`
        setTimeout(() => product_Promo[3].style.cssText = `transform: translateX(0%)`, 500)
    }

    if(translate > 0){
        translate--
        product_Promo[0].style.cssText = `transform: translateX(50%)`
        setTimeout(() => product_Promo[0].style.cssText = `transform: translateX(0%)`, 500)
    }
})


