'use strict';

///////////////////////////////////////

// All items

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Header Elements
const btnScrollTo = document.querySelector('.btn--scroll-to');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

// Section 1 Elements
const section1 = document.getElementById('section--1');
const images = document.querySelectorAll('.features__img');

// Section 2 Elements
const section2 = document.getElementById('section--2');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Sectionn 3 Elements
const section3 = document.getElementById('section--3');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

//Footer Elements 
const foot = document.querySelector('.section--sign-up');

// Others
const allSections = document.querySelectorAll('.section')
/////////////////////////////////////



// Modal Window
const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
  

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////


// Head Functions

// btn "learn more" scroller
btnScrollTo.addEventListener('click', function(){
  section1.scrollIntoView({behavior: 'smooth'})
});

//Nav - scroller 
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }

})

// Nav blur effect
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
   }
};


nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));


// Sticky Navigation

// High perfomance version

const obsCallBack = function(entries, observer){
  entries.forEach(entry => !entry.isIntersecting ? nav.classList.add('sticky') : nav.classList.remove('sticky') ); 
};

const navHeight = nav.getBoundingClientRect().height;

const obsOptions = {
  root: null,
  thresHold : 0,
  rootMargin: -navHeight +'px'
};

const headerObserver = new IntersectionObserver (obsCallBack,obsOptions);
headerObserver.observe(header);

////////////////////////////////////

// Section 1 Functions
const imageObserverCallBack = function(entries, observer){
  const [entry] = entries;

  if(entry.isIntersecting){
    
    // Replace data source
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load',() => {
      entry.target.classList.remove('lazy-img');

    })
  }else return

  imageObserver.unobserve(entry.target);
};


const imageObserver = new IntersectionObserver(imageObserverCallBack, {
  root: null,
  threshold: 0,
})

images.forEach(function (image){
  imageObserver.observe(image)
});


//////////////////////////////////

// Section 2 Functions
tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
   
  if(!clicked) return;

// Removing old element
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  tabsContent.forEach(tab=> tab.classList.remove('operations__content--active'));

// Adding New Elements
  clicked.classList.add('operations__tab--active')
  document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active')

});

///////////////////////////////

// Section 3 Functions

let curSlide = 0;
const maxSlide = slides.length

// creating dots
const createDots = function(slide){
  slides.forEach(function(_,i){
dotContainer.insertAdjacentHTML('beforeend',
`<button class="dots__dot" data-slide ="${i}"> </button>`
)
  } )
};

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot')
  .forEach( dot=> dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
};
///////////////////////////

// Move between slides
const goToSlide = function(slide){
  slides.forEach(function(s,i){ 
    s.style.transform = `translateX(${100 * (i - slide)}%)`
  })
}

// Next slide | Previous Slide

// Next
const nextSlide = function (){

  if(curSlide == maxSlide -1){
    curSlide = 0
  }else curSlide ++;
  
  goToSlide(curSlide) 
  activateDot(curSlide) 
}

btnRight.addEventListener('click', nextSlide);

// Previous
const prevSlide =  function() {
  
  if(curSlide == 0){
    curSlide = maxSlide -1;
  }else curSlide --;
  
  goToSlide(curSlide)  
  activateDot(curSlide) 
}

btnLeft.addEventListener('click',prevSlide)

// Arrow movement
document.addEventListener('keydown',function(e){
  if(e.key == "ArrowRight") {
    nextSlide()
  }
  else if(e.key == 'ArrowLeft'){
    prevSlide()
  }
});
///////////////////////////

// Dots 
dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const slide = e.target.dataset.slide;
    goToSlide(slide)
    activateDot(slide) 
  }
})


/////////////////////////////

// Others functions

// Init start conditions
const init = function(){
  goToSlide(0);
  activateDot(0);
  createDots();
}

// Sections entry animation
const revealSections = function(entries,observer){
  const [entry] = entries;

  if(entry.isIntersecting) {
    entry.target.classList.remove('section--hidden')
    
  }else return

  observer.unobserve(entry.target)

}

const sectionObserver = new IntersectionObserver(revealSections,{
  root: null ,
  threshold: 0.15,
})

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')

})

