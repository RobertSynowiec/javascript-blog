'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
};


//template Handlebarsnpm run watch


{
  const htmlClassWrapper = '.wrapper';

  const titleClickHandler = function (event){
    event.preventDefault();

    const clickedElement = this;
    console.log('clicked element', clickedElement );

    // start pomiary wysokości po kliknięciu
    const maxHeight = function (){
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
        //console.log('wrapper class' , wrapperStyle);
        // console.log( 'wrapper styles ', wrapperStyle.style);

        wrapperStyle.style.height = max ;
        //console.log('wysokośc po przypisaniu maxa: ' , wrapperStyle.style);
      }
    };
    maxHeight();
    // koniec pomiaru wysokości

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };
  //!!!!do poprawy kod wysokości postu!!!!

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list', /* used tag links */
    optArticleAuthorSelector = '.post-author', /* used author links */
    optTagsListSelector = '.tags.list ', /* used tag cloud*/
    optCloudClassCount = 5, /* used tag calculate*/
    optCloudClassPrefix = 'tag-size-', /* used tag calculate*/
    optAuthorsListSelector = '.authors.list' /* used author links */;

  const generateTitleLinks = function(customSelector = ''){

    /* remove contents of titleList */
    let titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for(let article of articles){

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element  and  get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link with Handlebars*/
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* insert link into titleList */

      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();

  /* Start calculateTagsParams ( function generateTags in function generateTags ) */

  const calculateTagsParams = function (tags){

    const params = { max: 0, min: 999999 };

    for (let tag in tags) {

      if( tags[tag] > params.max ){
        params.max = tags[tag];
      }
      else if( tags[tag] < params.min ){
        params.min = tags[tag];
      }
    }
    return params;
  };
  /* end calculateTagsParams ( function generateTags in function generateTags ) */

  /* Start selecting a class for the tag ( function generateTags in function generateTags ) */
  /*count = 5;
  max = 10;
  min = 2;*/

  const calculateTagClass = function (count, params){

    const normalizedCount = count - params.min; //3
    const normalizedMax = params.max - params.min; // 8
    const percentage = normalizedCount / normalizedMax; //0,375
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 ); //2

    return optCloudClassPrefix + classNumber ;
  };
  /* End selecting a class for the tag*/

  /* START tabs links*/

  const generateTags = function (){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for( let article of articles){

      /* find tags wrapper */
      let tagsWrapper = article.querySelector(optArticleTagsSelector);

      tagsWrapper.innerHTML = '';

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');


      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');



      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){


        /* generate HTML of the link with handlebars  */
        const linkHTMLData = {id: 'tag-' + tag , title: tag};
        console.log('linkHTMLData  ', linkHTMLData );

        const linkHTML = templates.articleLink(linkHTMLData);


        //const linkHTML = '<li><a href="#tag-' + tag  + '"><span>' + tag + '</span></a></li> ';

        /* add generated code to html variable */

        html = html + linkHTML;
        //console.log('html tag ', html);

        /* [NEW] check if this link is NOT already in allTags */

        if(!allTags[tag]){

          /* [NEW] add tag to aaTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector(optTagsListSelector);

      /* Start -  function call calculateTagsParams */

      const tagsParams = calculateTagsParams(allTags);

      /* End call function calculateTagsParams*/

      /* [NEW] create variable for all links HTML code */

      let allTagsHTML = '';

      /* [NEW] START LOOP: for each tag in allTags: */
      for(let tag in allTags){

        const tagLinkHTML = `<li><a class="${calculateTagClass(
          allTags[tag],
          tagsParams
        )}" href="#tag-${tag}">${tag}</a></li>`;
        //console.log('tagLinkHTML:', tagLinkHTML);

        allTagsHTML += tagLinkHTML;
        /* [NEW] END LOOP: for each tag in allTags: */
      }
      /*[NEW] add HTML from allTagsHTML to tagList */
      tagList.innerHTML = allTagsHTML;
    }

  };
  generateTags();


  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagslinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for( let activeTaglink of activeTagslinks ){

      /* remove class active */
      activeTaglink.classList.remove('active');
    }

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of allTagLinks){

      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function (){
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a, .list.tags a');

    /* START LOOP: for each link */
    for(let link of links){

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  };
  addClickListenersToTags();
  /* END tag links*/

  /* START author links*/
  const generateAuthors = function (){

    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for( let article of articles){

      /* find authors wrapper */
      let authorsWrapper = article.querySelector(optArticleAuthorSelector);

      authorsWrapper.innerHTML = '';

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-author attribute */
      const author = article.getAttribute('data-author');

      /* generate HTML of the link */

      const linkHTMLData = {id: 'author-' + author, title: author};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkHTML !!!!', linkHTML);


      //const linkHTML = '<li><a href="#author-' + author + '"<span>' + ' '  + author + '</span></a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* check if this link is NOT already in allAuthors */
      if(!allAuthors[author]){
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      /* END LOOP: for each authors */

      /* insert HTML of all the links into the authors wrapper */
      authorsWrapper.innerHTML = html;
    }
    /*find list of authors in right column */
    const authorList = document.querySelector(optAuthorsListSelector);

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allAuthors: */
    for(let author in allAuthors){

      const linkHTML = '<li><a href="#author-' + author + '"<span>' + ' '  + author + '</span></a>  (' + allAuthors[author] + ') </li>';

      allAuthorsHTML += linkHTML ;
    }
    authorList.innerHTML = allAuthorsHTML;

  };
  generateAuthors();

  const authorClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active */
    const activeAuthorslinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */

    for( let activeAuthorlink of activeAuthorslinks ){

      /* remove class active */
      activeAuthorlink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */

    for (let authorLink of allAuthorsLinks  ) {

      /* add class active */
      authorLink.classList.add('active');
    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };
  const addClickListenersToAuthors = function (){

    /* find all links to author */
    const links = document.querySelectorAll('.post-author a , .list.authors a ');

    /* START LOOP: for each link */
    for(let link of links){

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
  /* END author links*/

}