
//:: Attente et récupération des données de l'API

async function stockArticles () {
   let waitingProduct = await fetch('http://localhost:3000/api/products')
   return waitingProduct.json();
};


//: Insertion des données récupérées dans le DOM 
// async function displayData () {

// const articles = await stockArticles()
// .then (function (data) {
//    const values = data;
//    for(let article in values) {

//    //: Création du lien avec l'affichage de l'ID
//    let articleLink = document.createElement('a');

//    document.querySelector('.tems').appendChild(articleLink);
//    articleLink.href = `product.html?id= ${article.id}`;
   // articleLink.href = 'http://localhost:3000/api/products/';


//    //: Création et affichage de l'artticle

//    let articleDisplayed = document.createElement('article');
//    articleLink.appendChild(articleDisplayed);

//    //: Création et affichage de l'image

//    let imageDisplayed = document.createElement('img');
//    articleDisplayed.appendChild(imageDisplayed);
//    imageDisplayed.src = `product.html?id= ${article.imageUrl}`;
//    imageDisplayed.alt = `product.html?id= ${article.altTxt}`;

//    //: Création et affichage du nom

//    let nameDisplayed = document.createElement('h3');
//    articleDisplayed.appendChild(nameDisplayed);
//    nameDisplayed.innerHTML = `${articleOfApi[article].article.name}`;

//    //: Création et affichage de la description

//    let descriptionDisplayed = document.createElement('p');
//    articleDisplayed.appendChild(descriptionDisplayed);
//    descriptionDisplayed.innerHTML = `${articleOfApi[article].article.description}`;
// }

// });
// }

// displayData();
