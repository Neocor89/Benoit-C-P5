let articleOfLocalStorage = JSON.parse(localStorage.getItem("article"));

let quantity = 0;
let balancePrice = 0;
let sofaIdentifier;

//:: Selection de l'emplacement du parent html
const cartSelection = document.querySelector('#cart__items');

//:: Verification de l'état du Panier
function basketStatus () {
  if(articleOfLocalStorage === null || articleOfLocalStorage <= 0) {
      //: Message si panier vide 
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
            
            cartItemContent.appendChild(cartItemContentTitlePrice);
            //::Attribution de la class "cart__item__titlePrice"
            cartItemContentTitlePrice.className = "";

          let nameOfProduct = document.createElement("h2");
            cartItemContentTitlePrice.appendChild(nameOfProduct);
            nameOfProduct.innerHTML = product.name;

          let addColor = document.createElement("p");
            nameOfProduct.appendChild(addColor);
            addColor.innerHTML = articleOfLocalStorage[index].articleColors;
            //:: Affichage du prix
          let addPrice = document.createElement("p");
            cartItemContentTitlePrice.appendChild(addPrice);
            addPrice.innerHTML = product.price * articleOfLocalStorage[index].articleQuantity + "€";


          let cartItemContentSettings = document.createElement("div");
            cartItemContent.appendChild(cartItemContentSettings);

            //::Attribution de la class "cart__item__content__settings"
            cartItemContentSettings.className = "cart__item__content__settings";

          let cartItemContentSettingsQuantity = document.createElement("div");
          cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
            //::Attribution de la class "cart__item__content__settings__quantity"
            cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

 
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
                  
                  articleOfLocalStorage[index].articleQuantity = event.target.value;
        
                  //:: Enregistrement des données dans le LocalStorage
                  localStorage.setItem('article', JSON.stringify(articleOfLocalStorage));
                  location.reload();
                  
              });
            //:: Suppression des infos produits
          let cartItemContentSettingsDelete = document.createElement("div");
          cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
          cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

            //:: Création du btn de suppression produit
          let removeProduct = document.createElement("button");
            removeProduct.style.marginTop = "10px";
            removeProduct.style.borderRadius = "8px";
            removeProduct.style.fontSize = "18px";
            removeProduct.className = "deleteItem";
            removeProduct.textContent = "Supprimer";
            removeProduct.addEventListener("click", function(e) {
              e.stopPropagation();
               
                  //::Choix de suppression par "id"
                  //  ::Choix de suppression par "couleur"
                  let filtered = articleOfLocalStorage.filter(article => article.sofaIdentifier !== product._id && article.articleColors !== articleOfLocalStorage[index].articleColors);
                  if(filtered && window.confirm("Etes vous sûr de bien vouloir supprimer ce produit !")) {
                      localStorage.removeItem('article')
                      localStorage.setItem('article', JSON.stringify(filtered));
                      location.reload();
                    }
              })
            cartItemContentSettingsDelete.appendChild(removeProduct);

            //:: enregistrer l'id et la couleur séléctionnés

            quantity += parseInt(articleOfLocalStorage[index].articleQuantity);
            balancePrice += product.price * articleOfLocalStorage[index].articleQuantity;
            document.getElementById('totalPrice').innerText = balancePrice;
            document.getElementById('totalQuantity').innerText = quantity;
        })
 
        }
        
      }
      
    };

basketStatus();

            //::*::*::  Initialisation du formulaire  ::*::*::// 
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
  }
});

const validFirstName = function(inputFirstName) {
  let firstNameRegExp = new RegExp(
    '[a-zA-Z]+' 
  );
  
  let firstNameMsg = inputFirstName.nextElementSibling;
  
  if(firstNameRegExp.test(inputFirstName.value) && inputFirstName.value.length > 2) {
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
    '[a-zA-Z]+'
  );

let lastNameMsg = lastName.nextElementSibling;
  
  if(lastNameRegExp.test(lastName.value) && lastName.value.length > 2) {
    return true;
  } else {
      lastNameMsg.innerHTML = "Nom Non-valide";
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
    
    if(emailRegExp.test(input.value)) {
      return true;
    } else {
      emailMsg.innerHTML = "Adresse-Mail Non-valide";
      emailMsg.style.color = "#d31850";
      emailMsg.style.fontSize = "12px";
      emailMsg.style.fontWeight = "600";
      return false;
    }
   
  };

  const validAdress = function(inputAdress) {
  
  let adressMsg = inputAdress.nextElementSibling;

  if(inputAdress.value.length > 4){
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
    return true;
    } else {
    cityMsg.innerHTML = "Ville Incorrect";
    cityMsg.style.color = "#d31850";
    cityMsg.style.fontSize = "12px";
    cityMsg.style.fontWeight = "600";
      return false;
    }
  };
  
function sendingForm() {
  const orderButton = document.getElementById('order');
  //:: J'associe l'événement click à mon envoi de formulaire 
  orderButton.addEventListener('click', (event) => {
      //:: Previent les évènement innatendu avec methode "preventDefault"
      event.preventDefault();
          //:: J'encapsule les valeurs du formulaire dans un objet
      const contact = {
      firstName : document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address : document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value,
    }
 
  let products = [];
      for (let element = 0; element < articleOfLocalStorage.length; element++) {
          products.push(articleOfLocalStorage[element].sofaIdentifier);
      }
    
      const order = {
        contact,
        products
      };
    
   
      const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 
          'Content-Type': 'application/json',
        }
      };
    
      fetch("http://localhost:3000/api/products/order", options)
          .then(response => response.json())
          .then(data => {
          localStorage.setItem("orderId", data.orderId);
 
          document.location.href = 'confirmation.html';
        });
    
  }); 
}  
    sendingForm();