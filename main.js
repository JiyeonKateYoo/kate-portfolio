'use strict';


// change navbar color when it is scroll down
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--change');
  } else {
    navbar.classList.remove('navbar--change');
  }
});

// Handle scrolling when tapping on the navbar menu & set navbarMenu button active
const navbarMenu = document.querySelector('.navbar__menu');
const navbarMenuItems = document.querySelectorAll('.navbar__menu__item');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) { return; }

  navbarMenuItems.forEach((menuItem) => {
    if(menuItem.dataset.link === link){
      target.classList.add('active');
    }else{
      menuItem.classList.remove('active');
    }
  });
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
const homeHeight = document.querySelector('#home').getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button and set navbar__menu button active
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
  const active = document.querySelector('.navbar__menu__item.active');
  if(active == null){
    return;
  }
  active.classList.remove('active');
  
  document.querySelector('.navbar__menu__item:nth-child(1)').classList.add('active');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const category__btns = document.querySelectorAll('.category__btn');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // set category button active(selection)   1.CSS  2.forEach

  /*  1.CSS로 처리 했을때 (Remove selection from the previous item and select the new one )

  const active = document.querySelector('.category__btn.selected');
  const acteBtn = document.querySelector('.category__btn'); 

  if (active != null ) {
    active.classList.remove('selected');
  }

  if(false == acteBtn.classList.contains('selected')){
    e.target.parentNode.classList.add('selected');
  } 
  e.target.classList.add('selected');
*/

  // 2.forEach 처리 했을때
  category__btns.forEach((category__btn) => {
    if(category__btn.dataset.filter === filter){
      category__btn.classList.add('selected');
    }else{
      category__btn.classList.remove('selected');
    }
  });

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
}

