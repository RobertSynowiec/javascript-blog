'use strict';
const htmlClassWrapper = ".wrapper";

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log( 'klikniety artykuł ', clickedElement );

  // start pomiary wysokości po kliknięciu
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
// koniec pomiaru wysokości

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
      optArticleTagsSelector = '.post-tags .list', /* used tag links */
      optArticleAuthorSelector = '.post-author', /* used author links */
      optTagsListSelector = '.tags.list ', /* used tag cloud*/
      optCloudClassCount = 5,
      optCloudClassPrefix = 'tag-size-',
      optAuthorsListSelector = '.authors.list' /* used author links */;
      console.log('.authors.list', optAuthorsListSelector);

const generateTitleLinks = function generateTitleLinks(customSelector = '')
{

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


/* Start calculateTagsParams ( function generateTags in function generateTags ) */


const calculateTagsParams = function calculateTagsParams(tags){

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
}
/* end calculateTagsParams ( function generateTags in function generateTags ) */

/* Start selecting a class for the tag ( function generateTags in function generateTags ) */

 function calculateTagClass (count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  //console.log( 'classNumber ', classNumber);
  return optCloudClassPrefix + classNumber
}
//calculateTagClass ();
//console.log('calculateTagClass', calculateTagClass (allTags[tag], tagsParams));

/* End selecting a class for the tag*/


/* START tabs links*/






const generateTags = function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for( let article of articles){

    /* find tags wrapper */
    let tagsWrapper = article.querySelector(optArticleTagsSelector);
 //console.log('tags wrapper :', tagsWrapper);
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

      const linkHTML = '<li><a href="#tag-' + tag  + '"><span>' + tag + '</span></a></li> ';

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


      /* [NEW] add html from allTags to tagList */
      //stagList.innerHTML = allTags.join(' ');



/* Start -  function call calculateTagsParams */

    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParam:', tagsParams)

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
	};

    }

generateTags();




const tagClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute("href");


  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');


  /* find all tag links with class active */
  const activeTagslinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for( let activeTaglink of activeTagslinks ){


    /* remove class active */
    activeTaglink.classList.remove('acive');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]')

  /* START LOOP: for each found tag link */
  for (let tagLink of allTagLinks){

    /* add class active */

  tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}



function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
    for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
}
}

addClickListenersToTags();
/* END tag links*/


/* START author links*/




const generateAuthors = function generateAuthors(){


 /* [NEW] create a new variable allAuthors with an empty object */
 let allAuthors = {};



  const articles = document.querySelectorAll(optArticleSelector);


  for( let article of articles){



  let authorsWrapper = article.querySelector(optArticleAuthorSelector);

  authorsWrapper.innerHTML = "";

  let html = '';


  const author = article.getAttribute('data-author');


  const linkHTML = '<li><a href="#author-' + author + '"<span>' + ' '  + author + '</span></a></li>';

  html = html + linkHTML;


  if(!allAuthors[author]){

    allAuthors[author] = 1;
  } else {
    allAuthors[author]++;
 }


  authorsWrapper.innerHTML = html;
  }
  const authorList = document.querySelector(optAuthorsListSelector);


let allAuthorsHTML = '';


for(let author in allAuthors){

  const linkHTML = '<li><a href="#author-' + author + '"<span>' + ' '  + author + '</span></a>  (' + allAuthors[author] + ') </li>';

  allAuthorsHTML += linkHTML ;
  console.log(allAuthorsHTML);
}
  authorList.innerHTML = allAuthorsHTML;

  }


generateAuthors();



const authorClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute("href");

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const activeAuthorslinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  for( let activeAuthorlink of activeAuthorslinks ){


    /* remove class active */
    activeAuthorlink.classList.remove('acive');
     /* END LOOP: for each active tag link */
  }

/* find all tag links with "href" attribute equal to the "href" constant */
const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]')

/* START LOOP: for each found tag link */

for (let authorLink of allAuthorsLinks  ) {

 /* add class active */
  authorLink.classList.add('active');
/* END LOOP: for each found author link */
}
 /* execute function "generateTitleLinks" with article selector as argument */
 generateTitleLinks('[data-author="' + author + '"]');
}
const addClickListenersToAuthors = function addClickListenersToAuthor(){

  /* find all links to author */
  const links = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */
  for(let link of links){

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
/* END author links*/



