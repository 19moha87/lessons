"use strict"

// !!!!визначення пк чи мобілка


const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
};



if (isMobile.any()) {
   console.log("це мобілка");
   document.body.classList.add("_touch");
   let menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
         const menuArrow = menuArrows[index];
         menuArrow.addEventListener("click", () => {
            // відкриття лише одного підменю
            const menuItem = menuArrow.parentElement;
            const isOpen = menuItem.classList.contains('_active');
            document.querySelectorAll('.menu__item._active').forEach(item => {
               item.classList.remove('_active');
            });

            if (!isOpen) {
               menuItem.classList.add('_active');
            }

         });

      }
   }
} else {
   console.log("це пк");
   document.body.classList.add("_pc");
}





//!!!!!!!! burger!!!!!

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {

   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');

   });
}

//!!!прокрутка до розділів на сторінці

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });
   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector(".header").offsetHeight;


         if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}



//!!!!!!!! поява при скролі!!!!!

let options = {
   root: null,
   rootMargin: "0px 0px 0px 0px",
   threshold: 0.15,
};


let callback = (entries, observer) => {
   entries.forEach((entry) => {
      const targetElement = entry.target;
      if (entry.isIntersecting) {
         //targetElement.classList.add('_show');

         //  тут я прописав, щоб клас присвоювало першому елементу у батьківському блоці
         targetElement.classList.add('_show');


      } else {
         //якщо треба щоб постійно спрацбовувало, а не оди раз, то клас треба прибрати
         //targetElement.firstElementChild.classList.remove('_show');
      }

   });
};



let observer = new IntersectionObserver(callback, options);
//якщо один елемент
//let target = document.querySelector('.section02');
//observer.observe(target);




// якщо елементів декілька
let someElements = document.querySelectorAll('._todo');
someElements.forEach(someElement => {
   observer.observe(someElement);
});
