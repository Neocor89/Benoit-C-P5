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

    
    
//::*:: AFFICHAGE DES PRODUITS VIA REPONSE JSON
stockArticles();

