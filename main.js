let cart= document.querySelector(".cart");
let opencart= document.getElementById('opencart');
let closecart= document.getElementById('closecart');
let content= document.querySelector(".content");
let list = document.querySelector(".cart-list");
let col = document.querySelector(".list");
let total = document.querySelector(".totalprice")
let quantity = document.querySelector(".quantity")

opencart.addEventListener("click",function(){
    cart.classList.add("active")
});
closecart.addEventListener("click",function(){
    cart.classList.remove("active")
});

let products = [
    {
        id:1,
        image:"view-ancient-greek-goddess-bust.jpg",
        name:"Ancient greek woman",
        price:1200 
    },
    {
        id:2,
        image:"elegant-plants-decoration-vase.jpg",
        name:"Elegant vase",
        price:900
    },
    {
        id:3,
        image:"view-ancient-greek-bust-figure.jpg",
        name:"Ancient greek man",
        price:1500
    },
    {
        id:4,
        image:"minimalist-modern-vases-books-arrangement.jpg",
        name:"Modern vase",
        price:500
    },
    {
        id:5,
        image:"still-life-shoe-rack-indoors.jpg",
        name:"Floor lamp",
        price:2500
    },
    {
        id:6,
        image:"view-modern-photorealistic-lamp.jpg",
        name:"Table lamp",
        price:400
    }
];

let incart =[];
if(localStorage.products != null){
    incart =JSON.parse(localStorage.products)
}
else{
    incart=[]
}


function thestart(){
    products.forEach( function(value){
        let fdiv =document.createElement("div")
        fdiv.classList.add("product-box")
        fdiv.innerHTML=`
        <img src="${value.image}" />
        <h2>${value.name} </h2>
        <span>${value.price}</span>
        <br>
        <button class="btn btn-light" onclick="addtocart(${value.id})">ADD TO CART</button>
        `
        content.appendChild(fdiv)
    })
}
thestart();

function addtocart(id){
    let product = products.find( (pdata)=> pdata.id === id )
    let productindex = incart.findIndex( (pdata)=> pdata.id === id )

    console.log(productindex)
    if( productindex > -1 ){
        incart[productindex].quantity +=1
    }
    else{
        incart.push({...product,quantity:1})
    }
    
    fillcart();
}

function fillcart(){
    col.innerHTML = ""
    let totalprice =0;
    let count = 0
    incart.forEach( function( value){
        totalprice += value.price * value.quantity
        count+=value.quantity
        let newli = document.createElement("li");
        newli.classList.add("box");
        newli.innerHTML =`
        <img src="${value.image}" />
        <h2>${value.name} </h2>
        <span>${value.price}</span>
        <div class="count">
        <button class="btn btn-light" onclick="changequantity(${value.id} , ${value.quantity +1})"> + </button>
        <div> ${value.quantity} </div>
        <button class="btn btn-light" onclick="changequantity(${value.id} , ${value.quantity -1})"> - </button>
        </div>
        `;
        col.appendChild(newli);
    });
    total.innerHTML =totalprice;
    quantity.innerHTML = count;
    localStorage.setItem("products" , JSON.stringify(incart))

}

    function changequantity( id , newquantity)
    {
        let productindex = incart.findIndex( (pdata)=> pdata.id === id );
        if(newquantity === 0){
            incart.splice(productindex,1)
        }
            else{
                incart[productindex].quantity = newquantity;
            }
            fillcart();
        
    }

    function getdatalcl(){
        localStorage.getItem("products") 
        fillcart()
    }
    getdatalcl()
    



 