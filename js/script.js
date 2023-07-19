'use strict';
const htmlClassWrapper = ".wrapper";

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  const maxHeight = function getDocHeight(){
    const articles = document.querySelectorAll('.post.active');

    for(let article of articles) {

      const articleHeight = article.offsetHeight;
      //const articleWidth = article.offsetWidth;

      let max = 0;
        if(articleHeight > max) {
            max = articleHeight;
          }
      console.log('max :' ,max);
      const wrapperStyle = document.querySelector(htmlClassWrapper);
      console.log('wrapper class' , wrapperStyle);
      console.log( 'wrapper styles ', wrapperStyle.style);
      wrapperStyle.style.height = max ;
      console.log('wysokośc po przypisaniu maxa: ' , wrapperStyle.style);
    }
  }
      maxHeight();
      console.log(' funcion maxHeight : ', maxHeight);


      /* remove class 'active' from all article links  */
      const activeLinks = document.querySelectorAll('.titles a.active');
      for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
      };

      /* add class 'active' to the clicked link */
      clickedElement.classList.add('active');

      /* remove class 'active' from all articles */
      const activeArticles = document.querySelectorAll('.posts article.active');

      for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
      };

      /* get 'href' attribute from the clicked link */
      const articleSelector = clickedElement.getAttribute("href");

      /* find the correct article using the selector (value of 'href' attribute) */
      const targetArticle = document.querySelector(articleSelector);

      /* add class 'active' to the correct article */
      targetArticle.classList.add('active');
}
//!!!!do poprawy kod wysokości postu!!!!
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector ='.post-tags .list';

const generateTitleLinks = function generateTitleLinks(){

  /* remove contents of titleList */
  let titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for(let article of articles){

    /* get the article id */

     const articleId = article.getAttribute('id');

    /* find the title element  and  get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */

    html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
            link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();

const generateTags = function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for( let article of articles){

    /* find tags wrapper */
    let tagsWrapper = article.querySelector(optArticleTagsSelector);
    tagsWrapper.innerHTML = "";


    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */

      const tagHTML = '<li><a href="#tag-' + tag  + '"><span>' + tag + '</span></a></li> ';

      /* add generated code to html variable */

      html = html + tagHTML;

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      console.log('tags wrapper inner ', tagsWrapper.innerHTML);
      /* END LOOP: for every article: */
  }
}
generateTags();

