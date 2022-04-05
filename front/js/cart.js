

//:: RAPPEL DU LOCAL_STORAGE
let articleOfLocalStorage = JSON.parse(localStorage.getItem("article"));


let quantity = 0;
let balancePrice = 0;



//:: Selection de l'emplacement html
const cartSelection = document.querySelector('#cart__items');

let sofaIdentifier;




function changeQuantityOfProduct () {

  let changeQuantity = document.querySelectorAll('.itemQuantity');
console.log(document.getElementsByClassName('itemQuantity'));

  console.log(changeQuantity.length)
  for(let i = 0; i < changeQuantity.length; i ++) {
    console.log(changeQuantity[i])
    
  }
}






//::*::*::*::*::*::*::*::*::*::*:!     DELETE QUANTITY    !:*::*::*::*::*::*::*::*::*::*//


function deleteProduct () {
//:: Suppression des produits
//:: Selection de l'emplacement dans le html
let removeBtnsCart = document.getElementsByClassName('deleteItem');


let articleOfLocalStorage = JSON.parse(localStorage.getItem("article"));

for(var value = 0; value < removeBtnsCart.length; value++) {
    var button = removeBtnsCart[value];
    button.addEventListener('click', e => {
        event.preventDefault();
        console.log(e);
        // :: Eviter comportement inatendu au moment de l'intéraction avec l'élément
        // :: Intéraction avec les différentes possibilitées de suppression des produits
        let idProductDelete = articleOfLocalStorage[value].sofaIdentifier;
        console.log(idProductDelete);
        //::Choix de suppression par "id"
        let colorProductDelete = articleOfLocalStorage[value].articleColors;
        //::Choix de suppression par "couleur"

         console.log("MAUVAISE MANIP")
        let filtered = articleOfLocalStorage.filter(element => element.sofaIdentifier !== idProductDelete && 
            element.sofaIdentifier !== colorProductDelete );
               localStorage.setItem('article', JSON.stringify(filtered));
     
    });
}
};




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

          let cartItemContentSettingsQuantity = document.createElement("div");
          cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
            //::Attribution de la class "cart__item__content__settings__quantity"
            cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

            //:: Ajout info Quantitée

            
            //:: Information Quantitée des produit avec html
            
          let quantityDisplay = document.createElement("input");
            cartItemContentSettingsQuantity.appendChild(quantityDisplay);
            quantityDisplay.value = articleOfLocalStorage[index].articleQuantity;
            quantityDisplay.className = "itemQuantity";
            quantityDisplay.setAttribute("type", "number");
            quantityDisplay.setAttribute("min", "1");
            quantityDisplay.setAttribute("max", "100");
            quantityDisplay.setAttribute("name", "itemQuantity");
            quantityDisplay.addEventListener('change', (event) => {
              event.preventDefault();
              //:: Suppression d'un comportement inatendu au moment de l'intéraction avec l'élément
                console.log(event.target.value)
                  
      
                  articleOfLocalStorage[index].articleQuantity = event.target.value;
        
                  //:: Enregistrement des données dans le LocalStorage
                  localStorage.setItem('article', JSON.stringify(articleOfLocalStorage));
                  
              });
            //:: Suppression des infos produits
          let cartItemContentSettingsDelete = document.createElement("div");
          cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
          cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

            //:: Suppression produit
          let removeProduct = document.createElement("button");
            removeProduct.style.borderRadius = "6px";
            removeProduct.style.cursor = "pointer";
            removeProduct.style.marginBottom = "15px";
            removeProduct.style.marginRight = "8px";
            removeProduct.style.fontSize = "12px";
            removeProduct.className = "deleteItem";
            removeProduct.innerText = "Supprimer";
            cartItemContentSettingsDelete.appendChild(removeProduct);


             //:: enregistrer l'id et la couleur séléctionnés
            
         

            quantity += parseInt(articleOfLocalStorage[index].articleQuantity);
            balancePrice += product.price * articleOfLocalStorage[index].articleQuantity;
            document.getElementById('totalPrice').innerText = balancePrice;
            document.getElementById('totalQuantity').innerText = quantity;
        })

        // const totalQtt = articleOfLocalStorage.reduce((product, qtt) => {
        //   return product + qtt.articleQuantity;
        // },0);
        // console.log(totalQtt);
        
        }
        deleteProduct();
        changeQuantityOfProduct();
    }



};



basketStatus();











//::*::*::*::*::*::*::*::*::*:!     START CHANGING & DELETE QUANTITY      !:*::*::*::*::*::*::*::*::*//





//::*::*::*::*::*::*::*::*::*::*:!     "END" CHANGING & DELETE QUANTITY     !:*::*::*::*::*::*::*::*::*::*//












//::*::*::  Initialisation du formulaire  ::*::*:://

let formError = document.getElementById('firstNameErrorMsg');
let form = document.querySelector(".cart__order__form");

let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let email = document.querySelector('#email');
let address = document.querySelector('#address');
let city = document.querySelector('#city');




firstName.addEventListener("change", function() {
    validFirstName(this)
  });

lastName.addEventListener("change", function() {
  validLastName(this)
});


email.addEventListener("change", function() {
  validEmail(this)
});


address.addEventListener("change", function() {
  validAdress(this)
});


city.addEventListener("change", function() {
  validCity(this)
});

  


// :: VALIDATION FORMULAIRE

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if(validFirstName(form.firstname) && validLastName(form.lastname) && validEmail(form.email) && validAdress(form.adress) && validCity(form.city)) {
    form.submit();
  }else {
    console.log("FORMULAIRE NON ENVOYE");
  }
});


const validFirstName = function(inputFirstName) {
  let firstNameRegExp = new RegExp(
    '[a-z -Z\w]' 
  );
  
  let firstNameMsg = inputFirstName.nextElementSibling;
  console.log(firstNameRegExp);
  
  if(firstNameRegExp.test(inputFirstName.value) && inputFirstName.value.length > 2) {
      firstNameMsg.innerHTML = "Prenom Correct";
      firstNameMsg.style.color = "#0be05d";
    return true;
  } else {
      firstNameMsg.innerHTML = "Prenom Non-valide";
      firstNameMsg.style.color = "#d31850"; 
      firstNameMsg.style.fontSize = "12px";
      firstNameMsg.style.fontWeight = "600";
    return false;
  }
  
};


const validLastName = function(lastName) {
  let lastNameRegExp = new RegExp(
    "[a-z -Z\w]"
  );

let lastNameMsg = lastName.nextElementSibling;
  console.log(lastNameRegExp);
  
  if(lastNameRegExp.test(lastName.value) && lastName.value.length > 2) {
      lastNameMsg.innerHTML = "Nom Valide";
      lastNameMsg.style.color = "#0be05d";
      lastNameMsg.style.fontSize = "12px";
      lastNameMsg.style.fontWeight = "600";
    return true;
  } else {
      lastNameMsg.innerHTML = "Nom Incorrect";
      lastNameMsg.style.color = "#d31850";
      lastNameMsg.style.fontSize = "12px";
      lastNameMsg.style.fontWeight = "600";
    return false;
  }
  
};



const validEmail = function(input) {
    let emailRegExp = new RegExp(
      '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g'
    );
    
      let emailMsg = input.nextElementSibling;
    console.log(emailMsg)
    
    if(emailRegExp.test(input.value)) {
      emailMsg.innerHTML = "Adresse-Mail Valide";
      emailMsg.style.color = "#0be05d";
      emailMsg.style.fontSize = "12px";
      emailMsg.style.fontWeight = "600";
      return true;
    } else {
      emailMsg.innerHTML = "Adresse-Mail Incorrect";
      emailMsg.style.color = "#d31850";
      emailMsg.style.fontSize = "12px";
      emailMsg.style.fontWeight = "600";
      return false;
    }
   
  };



  const validAdress = function(inputAdress) {
  
  let adressMsg = inputAdress.nextElementSibling;

  if(inputAdress.value.length > 4){
    adressMsg.innerHTML = "Adresse Valide";
    adressMsg.style.color = "#0be05d";
    return true;
    } else {
    adressMsg.innerHTML = "Adresse Incorrect";
    adressMsg.style.color = "#d31850";
    adressMsg.style.fontSize = "12px";
    adressMsg.style.fontWeight = "600";
      return false;
    }
  };


  const validCity = function(inputCity) {
    let cityRegExp = new RegExp(
      '^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$'
    );
    
  let cityMsg = inputCity.nextElementSibling;
  
  if(cityRegExp.test(inputCity.value)){
    cityMsg.innerHTML = "Ville Valide";
    cityMsg.style.color = "#0be05d";
    cityMsg.style.fontSize = "12px";
    cityMsg.style.fontWeight = "600";
    return true;
    } else {
    cityMsg.innerHTML = "Ville Incorrect";
    cityMsg.style.color = "#d31850";
    cityMsg.style.fontSize = "12px";
    cityMsg.style.fontWeight = "600";
      return false;
    }
  };
  






let inputQuantity = document.querySelector("button");
let inputDeleteProduct = document.getElementsByClassName("deleteItem");
console.log();



let stockId;
let stockColor;
let stockQuantity;

function verificationColors() {
    
  let articleOfLocalStorage = JSON.parse(localStorage.getItem("article"));
    for(let values in articleOfLocalStorage) {
      if(articleOfLocalStorage[values].articleColors && articleOfLocalStorage[values].articleQuantity) {
          stockColor = articleOfLocalStorage[values].articleColors;
          stockId = articleOfLocalStorage[values].sofaIdentifier; 
          stockQuantity = articleOfLocalStorage[values].articleQuantity;
          return true;
        } else {
          return console.log(stockColor + " " + stockQuantity + " " + stockId);
      }
      
    }

    
}

verificationColors()

/*

+ "DEBUT" REPRENDRE POUR SUPPRESSION QUANTITES VIA INPUT ITEM_QUANTITY
::for(let deletVal = 0; deletVal < deleteButton.length; deletVal++) {
      :deleteButton[deletVal].addEventListener('click', (event) => {
          :event.preventDefault();
:: let quantityProductDelete = articleOfLocalStorage[deletVal].articleQuantity;
            Choix de suppression par "quantité"

      :articleOfLocalStorage = articleOfLocalStorage.filter(element => element.product.id !== idProductDelete || 
      :element.product.id !== colorProductDelete || 
      :element.product.id !== quantityProductDelete);

 Mise à jour des nouvelles valeurs si suppression
      :localStorage.setItem('article', JSON.stringify(articleOfLocalStorage));
+ "FIN" REPRENDRE POUR SUPPRESSION QUANTITES VIA INPUT ITEM_QUANTITY

*/



//:: Suppression modif et validation localStorage 


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

    
      
    


