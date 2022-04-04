const u=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}};u();const a={dataPath:"/fisheye/assets/data/photographer.json",cloudinaryBaseImg:"https://res.cloudinary.com/cyrillegoas/image/upload/fisheye/",cloudinaryBaseVideo:"https://res.cloudinary.com/cyrillegoas/video/upload/fisheye/"};async function p(t){return await(await fetch(t)).json()}const c=(t=0)=>new Promise(e=>setTimeout(e,t)),d={};function f({photographers:t,media:e}){t.forEach(i=>{d[i.id]={id:i.id,name:i.name,portrait:i.portrait,city:i.city,country:i.country,tagline:i.tagline,price:i.price,media:e.filter(s=>s.photographerId===i.id)}})}function m(t){return Object.values(t).map(i=>`<li class="profiles__card">
          <figure class="photographer-card">
            <a
              class="photographer-card__link"
              href="./src/pages/photographer.html?id=${i.id}"
              aria-label="link to ${i.name}'s photos gallery"
            >
              <div class="photographer-thumb">
                <img
                  class="photographer-thumb__img"
                  src="${a.cloudinaryBaseImg}${i.id}/${i.portrait}"
                  alt="${i.name}"
                />
                <img
                  class="photographer-thumb__img-clip"
                  src="./assets/utils/mask_card.svg"
                  tabindex="-1"
                ></img>
              </div>
              <figcaption>
                <h2 class="photographer-card__name">${i.name}</h2>
              </figcaption>
            </a>
            <p class="photographer-card__description">
              <span class="photographer-card__location">${i.city}, ${i.country}</span>
              <span class="photographer-card__quote">${i.tagline}</span>
              <span class="photographer-card__rate">${i.price}\u20AC/jour</span>
            </p>
          </figure>
        </li>`).join("")}function g(t,e){const i=m(e);t.innerHTML=i}function y(t){return`
    <div class="photographer-info__description">
      <h1 class="photographer-info__name">${t.name}</h1>
      <span class="photographer-info__location">${t.city}, ${t.country}</span>
      <span class="photographer-info__quote">${t.tagline}</span>
    </div>
    <div class="photographer-info__btn-wrapper">
      <button class="btn" aria-haspopup="dialog" aria-label="contact me">Contactez-moi</button>
    </div>
    <div class="photographer-thumb">
      <img 
        class="photographer-thumb__img"
        src="${a.cloudinaryBaseImg}${t.id}/${t.portrait}"
        alt="${t.name}"
      />
      <img
        class="photographer-thumb__img-clip"
        src="../../assets/utils/mask_card-grey.svg"
        tabindex="-1"
      ></img>
    </div>`}function l(t,e){if(!(t instanceof Element))throw new Error("No modal found!");this.modal=t;const i=t.querySelector(".contact-modal__title");this.closeModalButton=t.querySelector("button.contact-modal__close"),this.submitButton=t.querySelector('button[aria-label="send message"]'),this.form=t.querySelector("form.contact-modal__form"),i.innerHTML=`Contactez-moi<br />${e.name}`,t.addEventListener("click",s=>this.handleClickOutside(s)),this.closeModalButton.addEventListener("click",()=>this.closeModal()),this.form.addEventListener("submit",s=>this.submitForm(s)),t.addEventListener("keydown",s=>this.handleKeyDown(s))}l.prototype.openModal=async function(){this.modal.removeAttribute("hidden"),await c(),this.modal.setAttribute("aria-hidden","false"),this.focusBeforeOpenning=document.activeElement,this.modal.focus()};l.prototype.closeModal=async function(){this.modal.setAttribute("aria-hidden","true"),await c(500),this.modal.setAttribute("hidden",""),this.focusBeforeOpenning.focus()};l.prototype.handleClickOutside=function(t){t.currentTarget===t.target&&this.closeModal()};l.prototype.handleKeyDown=function(t){switch(t.key){case"Tab":t.shiftKey&&document.activeElement===this.closeModalButton?(t.preventDefault(),this.submitButton.focus()):!t.shiftKey&&document.activeElement===this.submitButton&&(t.preventDefault(),this.closeModalButton.focus());break;case"Escape":console.log("test"),this.closeModal();break}};l.prototype.submitForm=function(t){t.preventDefault();const e=this.modal.querySelectorAll("input"),i=this.modal.querySelector(".contact-modal__message");Array.from(e).forEach(s=>{console.log(`${s.name}: ${s.value}`)}),console.log(`${i.name}: ${i.value}`),this.closeModal()};function _(t,e){const i=y(e);t.insertAdjacentHTML("afterbegin",i);const s=document.querySelector('button[aria-label="contact me"]'),o=new l(document.querySelector(".contact-modal"),e);s.addEventListener("click",()=>o.openModal())}function n(t,e){this.gallery=t,this.cardsUnorderedList=t.querySelector("ul.gallery__cards"),this.sortedMedia=e.media,this.sortGalleryCardsBy(),this.sortedMedia.forEach(o=>{o.isliked=!1}),this.likesCount=this.sortedMedia.reduce((o,r)=>o+r.likes,0),this.likeCounter=t.querySelector(".like-counter__total"),this.lightBox=t.querySelector(".lightbox-modal");const i=t.querySelector("button.lightbox-modal__close-btn");this.lightBoxNextbutton=t.querySelector("button.lightbox-modal__next-btn"),this.lightBoxPrevbutton=t.querySelector("button.lightbox-modal__prev-btn"),this.filter=t.querySelector(".filter");const s=this.filter.querySelector(".filter__btn");this.filterListBox=this.filter.querySelector('[role="listbox"]'),this.listBoxOptions=Array.from(this.filterListBox.querySelectorAll("li")),this.selectedOptionIndex=0,this.renderGalleryCards(),this.updateLikeCounter(),this.cardsUnorderedList.addEventListener("click",o=>this.handleGalleryEvent(o)),this.cardsUnorderedList.addEventListener("keydown",o=>this.handleGalleryEvent(o)),i.addEventListener("click",()=>this.closeLightBox()),this.lightBoxNextbutton.addEventListener("click",()=>this.nextMedia()),this.lightBoxPrevbutton.addEventListener("click",()=>this.prevMedia()),this.lightBox.addEventListener("keydown",o=>this.handleKeyDown(o)),s.addEventListener("click",()=>this.toggleFilterListBox()),this.filterListBox.addEventListener("click",o=>this.getClickedOption(o)),this.filterListBox.addEventListener("focus",()=>{this.setActiveDescendant(),this.setOptionfocus()}),this.filterListBox.addEventListener("keydown",o=>this.filterKeyDown(o))}n.prototype.renderGalleryCards=function(){const t=this.sortedMedia.map(e=>`<li class="gallery__card" data-media-id="${e.id}">
            <figure class="photo-card">
              ${e.image?`<img
                    class="photo-card__img"
                    src="${a.cloudinaryBaseImg}${e.photographerId}/${e.image}"
                    alt="${e.title}, click or enter to open closeup view"
                    tabindex="0"
                    aria-haspopup="dialog"
                  />`:`<video class="photo-card__video" tabindex="0" aria-haspopup="dialog">
                      <source src="${a.cloudinaryBaseVideo}${e.photographerId}/${e.video}" type="video/mp4" />
                    </video>`}
              <figcaption class="photo-card__description">
                <span class="photo-card__name">${e.title}</span>
                <div class="photo-card__likes">
                  <span class="photo-card__likes-count">${e.likes}</span>
                  <img
                    class="photo-card__likes-icon ${e.isliked?"photo-card__likes-icon--liked":null}"
                    src="../../assets/utils/heart.svg"
                    alt="likes"
                    tabindex="0"
                  />
                </div>
              </figcaption>
            </figure>
          </li>`).join("");this.cardsUnorderedList.innerHTML=t};n.prototype.compareFn={popularit\u00E9:(t,e)=>e.likes-t.likes,date:(t,e)=>new Date(e.date).getTime()-new Date(t.date).getTime(),titre:(t,e)=>t.title>e.title?1:e.title>t.title?-1:0};n.prototype.sortGalleryCardsBy=function(t=this.compareFn.popularit\u00E9){this.sortedMedia.sort(t)};n.prototype.openLightBox=async function(){this.lightBox.removeAttribute("hidden"),await c(),this.lightBox.setAttribute("aria-hidden","false"),this.focusBeforeOpenning=document.activeElement,this.lightBox.focus()};n.prototype.closeLightBox=async function(){this.lightBox.setAttribute("aria-hidden","true"),await c(500),this.lightBox.setAttribute("hidden",""),this.focusBeforeOpenning.focus()};n.prototype.updateLightBoxMedia=function(){const t=this.sortedMedia[this.currentMediaIndex],e=this.gallery.querySelector(".lightbox-modal__content-wrapper"),i=this.gallery.querySelector(".lightbox-modal__title");e.innerHTML=`${t.image?`<img
      class="lightbox-modal__img"
      src="${a.cloudinaryBaseImg}${t.photographerId}/${t.image}"
      alt="${t.title}" />`:`<video
          class="lightbox-modal__video"
          controls
        >
          <source src="${a.cloudinaryBaseVideo}${t.photographerId}/${t.video}"  type="video/mp4"/>
        </video>`}`,i.textContent=`${t.title}`,this.lightBox.focus()};n.prototype.handleGalleryEvent=function(t){if(t.type==="keydown"&&t.key==="Enter"||t.type==="click"){const e=t.target;if(e.classList.contains("photo-card__img")||e.classList.contains("photo-card__video")){const{mediaId:i}=e.closest(".gallery__card").dataset;this.currentMediaIndex=this.sortedMedia.findIndex(s=>s.id===+i),this.updateLightBoxMedia(),this.openLightBox()}else e.classList.contains("photo-card__likes-icon")&&this.updateCardLikes(e.parentElement)}};n.prototype.updateCardLikes=function(t){const{mediaId:e}=t.closest(".gallery__card").dataset,i=this.sortedMedia.find(r=>r.id===+e),s=t.firstElementChild,o=t.lastElementChild;o.classList.contains("photo-card__likes-icon--liked")?(i.likes-=1,this.likesCount-=1):(i.likes+=1,this.likesCount+=1),i.isliked=!i.isliked,o.classList.toggle("photo-card__likes-icon--liked"),s.textContent=i.likes,this.updateLikeCounter()};n.prototype.nextMedia=function(){++this.currentMediaIndex>=this.sortedMedia.length&&(this.currentMediaIndex=0),this.updateLightBoxMedia()};n.prototype.prevMedia=function(){--this.currentMediaIndex<=0&&(this.currentMediaIndex=this.sortedMedia.length-1),this.updateLightBoxMedia()};n.prototype.handleKeyDown=function(t){switch(t.key){case"Escape":this.closeLightBox();break;case"ArrowLeft":this.prevMedia();break;case"ArrowRight":this.nextMedia();break;case"Tab":t.shiftKey&&document.activeElement===this.lightBoxPrevbutton?(t.preventDefault(),this.lightBoxNextbutton.focus()):!t.shiftKey&&document.activeElement===this.lightBoxNextbutton&&(t.preventDefault(),this.lightBoxPrevbutton.focus());break}};n.prototype.updateLikeCounter=function(){this.likeCounter.textContent=this.likesCount};n.prototype.toggleFilterListBox=async function(){const t=this.filter.querySelector(".filter__select");this.filterListBox.hasAttribute("hidden")?(this.filterListBox.removeAttribute("hidden"),await c(),t.classList.add("filter__select--open"),this.filterListBox.focus()):(this.clearAllFocusDesc(),t.classList.remove("filter__select--open"),await c(300),this.filterListBox.setAttribute("hidden",""))};n.prototype.getClickedOption=function(t){if(t.target!==t.currentTarget){const e=t.target;this.selectedOptionIndex=this.listBoxOptions.findIndex(i=>i===e),this.setOption()}};n.prototype.setOption=function(){const t=this.listBoxOptions[this.selectedOptionIndex],e=this.filter.querySelector(".filter__control-wrapper");this.sortGalleryCardsBy(this.compareFn[t.id]),e.firstChild.textContent=t.innerText,this.toggleFilterListBox(),this.renderGalleryCards()};n.prototype.setActiveDescendant=function(){const t=this.listBoxOptions[this.selectedOptionIndex];this.filterListBox.setAttribute("aria-activedescendant",t.id)};n.prototype.removeActiveDescendant=function(){this.filterListBox.removeAttribute("aria-activedescendant")};n.prototype.setOptionfocus=function(){this.listBoxOptions[this.selectedOptionIndex].classList.add("filter__option-wrapper--focus")};n.prototype.removeOptionfocus=function(){this.listBoxOptions[this.selectedOptionIndex].classList.remove("filter__option-wrapper--focus")};n.prototype.clearAllFocusDesc=function(){this.listBoxOptions.forEach(t=>{t.classList.remove("filter__option-wrapper--focus")}),this.removeActiveDescendant()};n.prototype.filterKeyDown=function(t){switch(t.key){case"ArrowDown":t.preventDefault(),this.selectedOptionIndex<this.listBoxOptions.length-1&&(this.removeOptionfocus(),this.selectedOptionIndex+=1,this.setActiveDescendant(),this.setOptionfocus());break;case"ArrowUp":t.preventDefault(),this.selectedOptionIndex>0&&(this.removeOptionfocus(),this.selectedOptionIndex-=1,this.setActiveDescendant(),this.setOptionfocus());break;case"Enter":case" ":t.preventDefault(),this.setOption();break;case"Escape":this.toggleFilterListBox();break}};function x(t,e){new n(t,e)}async function b(){const t=document.querySelector("ul.profiles"),e=document.querySelector("section.photographer-info"),i=document.querySelector("section.gallery"),o=+new URL(document.location).searchParams.get("id"),r=await p(a.dataPath);f(r),t&&g(t,d),e&&_(e,d[o]),i&&x(i,d[o])}b();
