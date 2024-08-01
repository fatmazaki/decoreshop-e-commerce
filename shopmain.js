let content= document.querySelector(".content");
let list = document.querySelector(".cart-list");
let col = document.querySelector(".list");
let total = document.querySelector(".totalprice")
let quantity = document.querySelector(".quantity")

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
        price:800
    },
    {
        id:7,
        image:"Untitled-7_081c8207-04cc-4da8-b348-1a0ab3954954_400x.webp",
        name:"Floor lamp",
        price:2400
    },
    {
        id:8,
        image:"009A2482_330x.webp",
        name:"Table Clock",
        price:1600
    },
    {
        id:9,
        image:"009A2902_330x.webp",
        name:"Frame",
        price:1000
    },
    {
        id:10,
        image:"009A3028_42b94b92-45b9-4797-b8f6-4fd4927a683a_330x.webp",
        name:"Angel Antique",
        price:2600
    },
    {
        id:11,
        image:"009A6799_1d0274b2-4355-4292-b730-e3d1276dac55_330x.webp",
        name:"Coffe Table",
        price:3400
    },
    {
        id:12,
        image:"65xx-400x500.jpg",
        name:"Tablue",
        price:4400
    },
    {
        id:13,
        image:"antique-decor-decoration-chair-old.jpg",
        name:"Table lamp",
        price:1800
    },
    {
        id:14,
        image:"etsy-home-decor-194e50bf9d844fb184943d7d8a4d211f.jpg",
        name:"Wall Decoration",
        price:900
    },
    {
        id:15,
        image:"light.webp",
        name:"Wall lamp",
        price:800
    },
    {
        id:16,
        image:"WhatsApp-Image-2022-07-17-at-8.24.37-PM-6-1-400x500.jpeg",
        name:"Antique",
        price:600
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
        <a href="form.html"><button class="btn btn-light ">SHOP NOW</button></a>
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