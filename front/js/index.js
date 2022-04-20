async function stockArticles() {
    fetch('http://localhost:3000/api/products/')
    .then((response) => {
         return response.json()
    })
    
    .then((data) => {
        const articles = document.getElementById('items');
        let listArticle = '';
        for (let article of data) {
            listArticle += `<a href="./product.html?id=`+article._id+`">
            <article>
              <img src="`+article.imageUrl+`" alt="`+article.altTxt+`">
              <h3 class="productName">`+article.name+`</h3>
              <p class="productDescription">`+article.description+`</p>
            </article>
          </a>`
        }
        articles.innerHTML = listArticle; 
    })
    .catch (function(error){
      return error;
    })
    
    };

stockArticles();

/*
* Récap async function stockArticles()
: Mise en place de la function asynchronously, 
: permet de ne pas bloquer l'exécution du code,
:  en attendant la response sous format JSON de l'api
: Mise en forme de la response en utilisant un template literals et l'interpolation des variables pour l'affichage des produits 
*/

