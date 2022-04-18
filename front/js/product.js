

//::Récupération de l'id via les paramètres de l'url
const getId = new URL(window.location.href).searchParams.get("id");

 //::Récupération des sélecteurs 
let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
const optionColor = document.getElementById('colors');
let messageError = "REQUEST NOT FOUND";







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
        // document.title = product.name;

        
        //:: Insertion balise html et valeurs en fonction des produits 
        for(let color of product.colors) {
            optionColor.innerHTML += `<option value="${color}">${color}</option>`;
        };
    
    })
    .catch(error => {
        alert(error.messageError)
    });
};

displayProduct();


//:: Sélection du boutton ajout au panier
const addCart = document.getElementById("addToCart");



function basketOfProducts() {

    //:: Sélection des balises html "couleur" & "quantité"
    const colorProduct = document. querySelector("#colors");
    const quantityProduct = document.querySelector("#quantity");

    //:: Vérification des choix "couleur" & "quantité"
    if (quantityProduct.value > 0 && quantityProduct.value <=100 && colorProduct.value) { 

        //:: Vérification données stockées dans LocalStorage
        if (localStorage.getItem("article")) {

            //:: Stockage des valeurs du LocalStorage et conversion en JavaScript
            let articleOfLocalStorage = JSON.parse(localStorage.getItem("article"));

            //:: Récupération de la valeur de la couleur
            let articleColors = document.querySelector("#colors").value;

            //:: Récupération de la valeur de la quantité
            let articleQuantity = document.querySelector("#quantity").value;

            //:: Vérification LocalStorage correspondance "id" et "couleurs" présente
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
                let articleColors = document.querySelector("#colors").value;
                let articleQuantity = document.querySelector("#quantity").value;


                let detailsArticleOfLocalStorage = {
                    sofaIdentifier : getId,
                    articleColors : articleColors,
                    articleQuantity  : articleQuantity,
                };

                //:: Ajouter des éléments à chaque fois.
                articleOfLocalStorage.push(detailsArticleOfLocalStorage);
                //::  Objet converti en string JSON
                let createCart = JSON.stringify(articleOfLocalStorage);
                localStorage.setItem("article", createCart);

            }


        }   else {            
            let articleOfLocalStorage = [];


            let sofaIdentifier = getId;
            let articleColors = document.querySelector("#colors").value;
            let articleQuantity = document.querySelector("#quantity").value;
  
            let detailsArticleOfLocalStorage = {
                sofaIdentifier : getId,
                articleColors : articleColors,
                articleQuantity  : articleQuantity,
           
            };
              
            articleOfLocalStorage.push(detailsArticleOfLocalStorage);
            
            let createCart = JSON.stringify(articleOfLocalStorage);
            localStorage.setItem("article", createCart);
            
         }
        
    }

  
};


/*
: Ajout écoute d'évènement 'click' sur boutton ajout panier 
: Et appel de la function "basketOfProducts"
*/
addCart.addEventListener("click", basketOfProducts);


/*
: Autre ajout d'écouteurs d'évènements :
: Vérification des données saisies par l'utilisateur 
: Confirmation d'ajout au panier du produit
*/
addCart.addEventListener("click",  function() {
const optionColor = document.getElementById('colors');
const valueQuantity = document.querySelector("#quantity");
    if(valueQuantity.value ==  0 || optionColor.value == "") {
        alert("Please select a color and  correct quantity")
    } else if(valueQuantity.value >  100) {
        alert("Le nombre de produits par commande est limité à 100 !")
    } else if (valueQuantity.value < 100 && optionColor.value) {
        alert(titleProduct.textContent + " ajouté(s) à votre panier")
    }
});