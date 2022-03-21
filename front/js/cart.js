

//:: RAPPEL DU LOCAL_STORAGE
let articleOfLocalStorage = JSON.parse(localStorage.getItem("article"));

let quantity = 0;
let balancePrice = 0;



//:: Selection de l'emplacement html
const cartSelection = document.querySelector('#cart__items');

let sofaIdentifier;


//:: Verification de l'état du Panier
function basketStatus () {
    if(articleOfLocalStorage === null || articleOfLocalStorage <= 0) {
        //: Si le panier vide 
        cartSelection.innerHTML = "<p>Votre panier ne contient aucun article pour le moment</p>"
        return false;
    } else {
        for(let index in articleOfLocalStorage) {
             fetch("http://localhost:3000/api/products/" + articleOfLocalStorage[index].sofaIdentifier)
            //:: Ajout du produit affiché
            .then(res => res.json())
            .then(product => {
            let addArticle = document.createElement("article");
            document.querySelector('#cart__items').appendChild(addArticle);
            //::Attribution de la class "cart__item"
            addArticle.className = "cart__item";
            addArticle.setAttribute("data-id", articleOfLocalStorage[index].sofaIdentifier);

            let addDisplay = document.createElement("div");
            addArticle.appendChild(addDisplay);
            //::Attribution de la class "cart__item__img"
            addDisplay.className = "cart__item__img";

            // let addImage = document.querySelector("img");
            // addImage.setAttribute("src",articleOfLocalStorage[article].imageOfArticle);
            // addImage.setAttribute("alt",articleOfLocalStorage[article].descriptionOfArticle);
            // addDisplay.appendChild(addImage);
            let addImage = document.createElement("img");
            addDisplay.appendChild(addImage);
            addImage.src = product.imageUrl;
            addImage.alt = product.altText;

            let cartItemContent = document.createElement("div");
            addArticle.appendChild(cartItemContent);

            //::Attribution de la class "cart__item__content"
            cartItemContent.className = "cart__item__content";


            //:: Affichage des différents prix des articles 
            let cartItemContentTitlePrice = document.createElement("div");
            // let cartItemContentTitlePrice = document.querySelector("input")
            
            cartItemContent.appendChild(cartItemContentTitlePrice);
            //::Attribution de la class "cart__item__titlePrice"
            cartItemContentTitlePrice.className = "";

            let nameOfProduct = document.createElement("h2");
            cartItemContentTitlePrice.appendChild(nameOfProduct);
            nameOfProduct.innerHTML = product.name;

            let addColor = document.createElement("p");
            nameOfProduct.appendChild(addColor);
            addColor.innerHTML = articleOfLocalStorage[index].articleColors;
           //:: Resultat à vérifier
            
            let addPrice = document.createElement("p");
            cartItemContentTitlePrice.appendChild(addPrice);
            addPrice.innerHTML = product.price * articleOfLocalStorage[index].articleQuantity + "€";

            // console.log( articleQuantity);


            let cartItemContentSettings = document.createElement("div");
            cartItemContent.appendChild(cartItemContentSettings);

            //::Attribution de la class "cart__item__content__settings"
            cartItemContentSettings.className = "cart__item__content__settings";

            let cartItemContentSettingsQunatity = document.createElement("div");
            cartItemContent.appendChild(cartItemContentSettings);
            //::Attribution de la class "cart__item__content__settings__quantity"
            cartItemContentSettingsQunatity.className = "cart__itemcontent__settings__quantity";

            //:: Ajout info Quantitée
            let addQuantity = document.createElement("p");
            cartItemContent.appendChild(addQuantity);
            addQuantity.innerHTML =  "Qt : " + articleOfLocalStorage[index].articleQuantity;

            

            // console.log(addQuantity);

            //:: Information Quantitée des produit avec html
            
            let quantityDisplay = document.createElement("input");
            console.log(quantityDisplay.value);
            cartItemContentSettingsQunatity.appendChild(quantityDisplay);
            quantityDisplay.value = articleOfLocalStorage[index].articleQuantity;
            quantityDisplay.className = "itemQuantity";
            quantityDisplay.setAttribute("type", "number");
            quantityDisplay.setAttribute("min", "1");
            quantityDisplay.setAttribute("max", "100");
            quantityDisplay.setAttribute("name", "itemQuantity");

            //:: Suppression des infos produits
            let cartItemContentSettingsDelete = document.createElement("div");
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
            cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            //:: Suppression produit
            let deleteProduct = document.createElement("p");
            cartItemContentSettingsDelete.appendChild(deleteProduct);
            deleteProduct.className = "deleteItem";
            deleteProduct.innerText = "Supprimer";


             //:: enregistrer l'id et la couleur séléctionnés
            //  let resetId = articleOfLocalStorage[article].sofaIdentifier;
            //  let resetColor = articleOfLocalStorage[article].articleColors;
 
            //  articleOfLocalStorage = articleOfLocalStorage.filter( value => value.sofaIdentifier !== resetId || value.articleColors !== resetColor);
    console.log(balancePrice);

            quantity += articleOfLocalStorage[index].articleQuantity;
            balancePrice += product.price * articleOfLocalStorage[index].articleQuantity;
            document.getElementById('totalPrice').innerText = balancePrice;
            document.getElementById('totalQuantity').innerText = quantity;
        })
        

        }
    }

};


//:: A mettre sur function
basketStatus();






//:: Initialisation du prix à 0

//:: Injection de la valeur "PRIX" dans le html




function changeQuantityOfProduct () {

    let changeQuantity = document.querySelectorAll('.itemQuantity');

    for(change = 0; change < changeQuantity.length; change ++) {
        changeQuantity[change].addEventListener('change', (event) => {
            //:: Suppression d'un comportement inatendu au moment de l'intéraction avec l'élément
            event.preventDefault();

            let mofificationOfQuantity =  articleOfLocalStorage[change].articleQuantity;
            let changingValue = changeQuantity[change].parseInt;
        //! interpréter la valeur comme un nombre avec laiser parseInt(); ? 

            const resultProduct = articleOfLocalStorage.find(value => value.changingValue !== mofificationOfQuantity);
            resultProduct.articleQuantity = changingValue;
            articleOfLocalStorage[change].articleQuantity = resultProduct.articleQuantity;
            //:: Recup des données LocalStorage
            localStorage.setItem('article', JSON.stringify(articleOfLocalStorage));
        });        
    }

}
changeQuantityOfProduct();






function deleteProduct () {
    //:: Suppression des produits
    let deleteButton = document.getElementsByClassName('deleteItem');
    //:: Selection de l'emplacement dans le html

    for(let deletion = 0; deletion < deleteButton.length; deletion++) {
        deleteButton[deletion].addEventListener('click', (event) => {
            event.preventDefault();
            //:: Eviter comportement inatendu au moment de l'intéraction avec l'élément

            //:: Intéraction avec les différentes possibilitées de suppression des produits
            let idProductDelete = articleOfLocalStorage[deletion].product.id;
            //::Choix de suppression par "id"
            let colorProductDelete = articleOfLocalStorage[deletion].product.colors;
            //::Choix de suppression par "couleur"
            let quantityProductDelete = articleOfLocalStorage[deletion].articleQuantity;
            //::Choix de suppression par "quantité"

            //::
            articleOfLocalStorage = articleOfLocalStorage.filter(element => element.product.id !== idProductDelete || 
                element.product.id !== colorProductDelete || 
                element.product.id !== quantityProductDelete);

            //:: Mise à jour des nouvelles valeurs si suppression
            localStorage.setItem('article', JSON.stringify(articleOfLocalStorage));
        });
    }
};

deleteProduct();








//::*::*::  Initialisation du formulaire  ::*::*::
let cartForm = document.querySelector('.cart__order__form');
let formError = document.getElementById('firstNameErrorMsg');


// function ValidateEmail(inputText) {
// 	let regExpForEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// 	if(inputText.value.match(regExpForEmail)) {
//         formError.innerHTML = "Email non valide, vérifier et essayer à nouveau";
// 		return false;
// 	}
// };



function validateEmail () {

    let email = document.getElementById('email').value;

    if (!email.match(/^[A-Za-z]\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        formError.innerHTML = 'Veuillez vérifier le champs em@il';
        return false;
    }
}

validateEmail();



function validateFirstName() {
    let firstName = document.querySelector('#firstName').value;

    if (firstName.length >= 2 && !firstName.match(/^[A-Za-z]*\s/)) {
        formError.innerHTML = 'Le champs Prénom est obligatoire';
        return false;
    }
};

validateFirstName();

function validateLastName() {
    let lastName = document.querySelector('#lastName').value;

    if (lastName.length >= 2 && !lastName.match(/^[A-Za-z]*\s/)) {
        formError.innerHTML = 'Le Champs Nom est obligatoire';
        return false; 
    }
};

// let regExpForEmail = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);     ([^0-9][^abc])




function sendingForm() {
    const orderButton = document.getElementById('order');

    //:: J'associe l'événement click à mon envoi de formulaire 
    orderButton.addEventListener('click', (event) => {
        //:: Previent les évènement innatendu avec methode "preventDefault"
        event.preventDefault();

            //:: J'encapsule les valeurs du formulaire dans un objet
        const personalUsersValues = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value
      }
    //:: J'initialise un "empty array" pour y ajouter mes valeurs une fois boucler 
    let catchArrayProducts = [];
        for (let element = 0; element < articleOfLocalStorage.length; element++) {
            catchArrayProducts.push(articleOfLocalStorage[element].sofaIdentifier);
        }
      
        const formValues = {
          personalUsersValues,
          catchArrayProducts,
        }
      
     
        const options = {
          method: 'POST',
          body: JSON.stringify(formValues),
          headers: { 
            'Content-Type': 'application/json',
          }
        };
      
        fetch("http://localhost:3000/api/products/order", options)
            .then(response => response.json())
            .then(data => {
            localStorage.setItem('orderId', data.orderId);
            document.location.href = 'confirmation.html?id='+ data.orderId;
          });
      
    }); 
      }  
      sendingForm();

    
      
    


