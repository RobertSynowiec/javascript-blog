'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

    const titleClickHandler = function(event){
        event.preventDefault();
        const clickedElement = this;

        console.log('data from clickElement', clickedElement);
        console.log('Link was clicked!');
        console.log('data from event: ', event ,'data from this: ', this);


        /* remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for(let activeLink of activeLinks){
        activeLink.classList.remove('active');

        console.log('data from activeLink ' , activeLink);
       }

        /* add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        console.log('data from clickedElement:', clickedElement);


        /* remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        console.log('data from activeArticles', activeArticles);

        for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
        };


        /* get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute("href");

        console.log('attributes returned by articleSelector: ', articleSelector);

        /* find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);

        console.log('attributes returned by targetArticle: ', targetArticle);

        /* add class 'active' to the correct article */
        targetArticle.classList.add('active');

        console.log('Active article after click', targetArticle);

    }

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
    link.addEventListener('click', titleClickHandler);
}