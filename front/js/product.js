

//::Récupération de l'id via les paramètres de l'url
const getId = new URL(window.location.href).searchParams.get("id");
console.log(getId);

 //::Récupération des sélecteurs 
let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
// let colorsProduct = document.getElementById("colors");
const optionColor = document.getElementById('colors');
let messageError = "REQUEST NOT FOUND";





displayProduct();

async function displayProduct() {

    //:: Attente de la response de l'api
     await fetch("http://localhost:3000/api/products/" + getId)

     //:: Convertion de la "response" en "response.json()"
    .then((response) => response.json())    
    .then(product => {

        //:: Selection Parent image
        let imgProduct = document.querySelector(".item__img");
        
        //:: Insertion image
        let displayImg = document.createElement("img");

        //:: Insertion image dans DOM
        imgProduct.appendChild(displayImg);

        //:: Récupération "attributs images" des données de l'api
        displayImg.setAttribute("src", product.imageUrl);
        displayImg.setAttribute("alt", product.altTxt);

        //::Récupération des data API
        titleProduct.innerHTML = product.name;
        priceProduct.innerHTML = product.price;
        descriptionProduct.innerHTML = product.description;
        document.title = product.name;

        
        //:: Insertion balise html et valeurs en fonction des produits 
        for(let color of product.colors) {
            optionColor.innerHTML += `<option value="${color}">${color}</option>`;
        };
    
    })
    .catch(error => {
        alert(error.messageError)
    });
};


//:: Sélection du boutton  
const addCart = document.getElementById("addToCart");

//::écoute de l'évènement 'click' d'ajout au panier du product
addCart.addEventListener("click", basketOfProducts);
//:: Appel de la function "basketOfProducts" dans l'écouteur d'évènement du 'click'

function basketOfProducts() {

    //:: Récupération de des balises html du choix "couleur" & "quantité"
    const colorProduct = document. querySelector("#colors");
    const quantityProduct = document.querySelector("#quantity");

    //:: Vérification des choix "couleur" & "quantité"
    if (quantityProduct.value > 0 && quantityProduct.value <=100 && quantityProduct.value != 0 && colorProduct.value != 0) { 

        //:: Vérification données stockées dans LocalStorage
        if (localStorage.getItem("article")) {

            //:: Récpération des valeurs article JSON en JavaScript
            let articleOfLocalStorage = JSON.parse(localStorage.getItem("article"));


            //:: Récupération de l' "id" id via les paramètres de l'url
            let sofaIdentifier = getId;

            //:: Récupération de la valeur de la couleur
            let articleColors = document.querySelector("#colors").value;

            //:: Récupération de la valeur de la quantité
            let articleQuantity = document.querySelector("#quantity").value;

            //:: Vérification dans le LocalStorage de la correspondance des "id" et "couleurs" déjà présente
            const itemVerification = articleOfLocalStorage.find(
            (value) => value.sofaIdentifier === getId && value.articleColors === articleColors);

            //:: Si le produit commandé est déjà dans le panier

            //:: Vérification "SI" option couleur ou id de l'article déjà dans le panier 
            if (itemVerification) {

                //:: Analyse et renvoi "number" de la valeur selectionné 
                let newQuantite = parseInt(articleQuantity) + parseInt(itemVerification.articleQuantity);
            
                itemVerification.articleQuantity = newQuantite;

                //:: Ajout de la valeur entré dans le LocalStorage
                localStorage.setItem("article", JSON.stringify(articleOfLocalStorage));
           
             
            } else {
                    
                let articleOfLocalStorage = JSON.parse(localStorage.getItem("article"));

                let sofaIdentifier = getId;
                // let nameOfArticle = document.querySelector("#title").textContent;
                let articleColors = document.querySelector("#colors").value;
                let articleQuantity = document.querySelector("#quantity").value;
                // let imageOfArticle = displayImg.src; 
                // let descriptionOfArticle = displayImg.alt;
                // let priceOfArticle = document.querySelector("#price").textContent;
             
            
                let detailsArticleOfLocalStorage = {
                    sofaIdentifier : getId,
                    // nameOfArticle : nameOfArticle,
                    articleColors : articleColors,
                    articleQuantity  : articleQuantity,
                    // imageOfArticle : imageOfArticle,
                    // descriptionOfArticle : descriptionOfArticle,
                    // priceOfArticle : priceOfArticle
                };
                    //:: Ajouter des éléments à chaque fois.
                    articleOfLocalStorage.push(detailsArticleOfLocalStorage);
                    //::  Objet converti en string JSON
                    let createCart = JSON.stringify(articleOfLocalStorage);
                    localStorage.setItem("article", createCart);
                
            }

        } else {

            let articleOfLocalStorage = [];

            let sofaIdentifier = getId;
            // let nameOfArticle = document.querySelector("#title").textContent;
            let articleColors = document.querySelector("#colors").value;
            let articleQuantity = document.querySelector("#quantity").value;
            // let imageOfArticle = displayImg.src; 
            // let descriptionOfArticle = displayImg.alt;
            // let priceOfArticle = document.querySelector("#price").textContent;
            
        
            let detailsArticleOfLocalStorage = {
                sofaIdentifier : getId,
                // nameOfArticle : nameOfArticle,
                articleColors : articleColors,
                articleQuantity  : articleQuantity,
                // imageOfArticle : imageOfArticle,
                // descriptionOfArticle : descriptionOfArticle,
                // priceOfArticle : priceOfArticle
            };
        
            articleOfLocalStorage.push(detailsArticleOfLocalStorage);
        
            let createCart = JSON.stringify(articleOfLocalStorage);
            localStorage.setItem("article", createCart);
          
        }
    }
};

