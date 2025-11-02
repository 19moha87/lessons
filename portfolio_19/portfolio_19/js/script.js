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

//!!!!!!!! закриття підменю кліком на будь-якій точці екрану
const menuFs = document.querySelectorAll('.menu__item');
if (menuFs.length > 0) {

   for (let index = 0; index < menuFs.length; index++) {
      const menuF = menuFs[index];

      document.addEventListener('click', menuClose);
      function menuClose(e) {
         if (!menuF.contains(e.target)) {
            menuF.classList.remove('_active');
         };
      };

   };

};




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




//!!!!!!!!!!!! ЕФЕКТ ДРУКУВАННЯ !!!!!!!!


window.addEventListener("load", pageLoaded);
function pageLoaded(e) {
   textType();
};

function textType() {
   const textTypeElements = document.querySelectorAll('[data-text-type]');
   console.log(textTypeElements);
   if (textTypeElements.length) {
      textTypeElements.forEach(textTypeElement => {
         console.log(textTypeElement);
         textTypeItem(textTypeElement);
      });
      function textTypeItem(text) {
         const textValue = text.textContent.trim();
         const textValueLength = textValue.length - 1;
         const textValueSpeed = +text.dataset.textType;
         const textValueDelay = +text.dataset.textTypeDelay;

         let index = 0;
         text.innerHTML = ``;
         setTimeout(() => {
            let interval = setInterval(() => {
               text.insertAdjacentHTML('beforeend', `${textValue[index]}`);
               if (index === textValueLength) {
                  clearInterval(interval);
                  text.classList.add('done');
               }
               ++index;
            }, textValueSpeed);
         }, textValueDelay);
      }
   }
}

//!!!! sviper!!!!

const swiper = new Swiper('.swiper', {
   // Optional parameters
   direction: 'horizontal',
   loop: true,
   lazy: true,
   // If we need pagination
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
      dynamicBullets: true,
      renderBullet: function (index, className) {
         return '<span class="' + className + '" >' + (index + 1) + '</span>';
      },

      //type: 'fraction',
      //renderFraction: function (currentClass, totalClass) {
      //   return 'фото <span class="' + currentClass + '"></span> із <span class="' + totalClass + '"></span>';
      //},

      //type: 'progressbar',

   },

   // Navigation arrows
   //navigation: {
   //   nextEl: '.swiper-button-next',
   //   prevEl: '.swiper-button-prev',
   //},

   // And if we need scrollbar
   scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
   },
   //вкл/викл перетягування на пк
   //simulateTouch: true,
   //чутливість свайпу
   //touchRatio:1;
   //кут спрацьовування свайпу/перетягування
   //touchAngle:45,
   //переключення при кліку на слайд, якщо слайдів на екрані більше ніж один
   slideToClickedSlide: true,

   //курсор перетягування
   //grabCursor: true,
   keyboard: {
      enabled: true,
      onlyViewport: true,
      pageUpDown: true,
   },

   mousewheel: {
      sensitivity: 1,
      //якщо буде декілька слайдерів, то будуть прокручуватись одночасно, тому наступний параметр краще не включати у такому випадку
      //eventsTarget: ".image-slider",
   },

   autoHeight: true,
   slidesPerView: 3,
   //slidesPerColumn: 2,
   watchOverflow: true,
   spaceBetween: 5,
   //slidesPerGroup: 3,
   //centerSlides:true,

   //автопрокрутка
   autoplay: {
      //пауза між слайдами
      delay: 1000,
      //закінчити на останньому слайді. Треба відключати луп.
      stopOnLastSlide: true,
      //відключити після ручного переключення
      disableOnInteraction: true,
   },
   speed: 800,
   //!!!!ефекти
   //effect: 'cards',
   //effect: 'coverflow',
   //прозорість
   //effect: 'fade',
   //fadeEffect: {
   //   crossFade: true,
   //},

   //переворот
   //effect: 'flip',
   //flipEffect: {
   //   slideShadows: true,
   //   //показ тільки активного слайду
   //   limitRotation: true,
   //},


   //куб
   //effect: 'cube',
   //cubeEffect: {
   //   slideShadows: true,
   //   shadow: true,
   //   shadowOffset: 20,
   //   shadowScale: 0.94,
   //},

   //effect: 'creative',
   //creativeEffect: {
   //   prev: {
   //      // will set `translateZ(-400px)` on previous slides
   //      translate: [0, 0, -400],
   //   },
   //   next: {
   //      // will set `translateX(100%)` on next slides
   //      translate: ['100%', 0, 0],
   //   },
   //},

   //адаптив
   breakpoints: {
      320: {
         slidesPerView: 1,
      },
      690: {
         slidesPerView: 2,
      },
      1020: {
         slidesPerView: 3,
      },
   },
   //відключити предзагрузку картинок
   //preloadImages: true,


});

