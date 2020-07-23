// Header Swiper
var swiper = new Swiper(".header-swiper", {
  slidesPerView: 5,
  centeredSlides: true,
  loop: true,
  spaceBetween: 7,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

//Bestseller Swiper
var swiperTwo = new Swiper("#swiper-container2", {
  slidesPerView: 5,
  observer: true,
  navigation: {
    nextEl: ".slider-button-next",
    prevEl: ".slider-button-prev",
  },
});

// Create and Render Featured Products

const relatedProductContainer = document.getElementById(
  "related-product-container"
);
const bestsellerProductContainer = document.getElementById(
  "bestseller-product-container"
);
const shippingInfoBox = document.getElementsByClassName("shipping-info");

//Related Products
const fetchRelatedProducts = () => {
  fetch("data-json/relatedProducts.json")
    .then((res) => res.json())
    .then((data) => {
      let relatedProductData = data;
      for (let i = 0; i <= 9; i++) {
        let widgetList = document.createElement("DIV");
        widgetList.classList.add("widget-list");
        widgetList.classList.add("swiper-lazy");
        widgetList.innerHTML += `
          <img class="product-img" src=${relatedProductData[i].img} />
          <div>
            <span class="product-rating"><i class="fas fa-star"></i> ${relatedProductData[i].rating}</span>
            <span class="product-comment">(${relatedProductData[i].comment} Yorum)</span>
          </div>
          <span class="product-code">${relatedProductData[i].code}</span>
          <h6 class="product-title">${relatedProductData[i].title}</h6>
          <p class="product-price">₺${relatedProductData[i].price}</p>
          <div class="shipping-info">BUGÜN KARGODA</div>
          <div class="add-to-cart">
          <div class="exchange-icon">
            <i class="fas fa-exchange-alt"></i>
          </div>
           <p class="add-to-cart-text">Sepete Ekle</p>
           </div>
          `;
        relatedProductContainer.appendChild(widgetList);
      }
      var addToCartButton = document.querySelectorAll(".add-to-cart");
      for (let i = 0; i < addToCartButton.length; i++) {
        addToCartButton[i].addEventListener("click", () => {
          itemNumbers();
        });
      }
    });
};

// Add Item to Cart and Save it on Local Storage //

//Gets value as string from local storage parse it into a number
//And displays it on Alert Icon
function itemNumbers() {
  let itemNumberInCart = localStorage.getItem("itemNumbers");
  let alertIcon = document.querySelector(".red-alert");
  itemNumberInCart = parseInt(itemNumberInCart);

  if (itemNumberInCart) {
    localStorage.setItem("itemNumbers", itemNumberInCart + 1);
    alertIcon.setAttribute("style", "visibility: visible;");
    alertIcon.textContent = itemNumberInCart + 1;
  } else {
    localStorage.setItem("itemNumbers", 1);
    alertIcon.setAttribute("style", "visibility: visible;");
    alertIcon.textContent = 1;
  }
}

//Checks the value of alert icon every time page loads
//if it has value it displays if not icon is invisible
function onLoadAlertIconValue() {
  let itemNumberInCart = localStorage.getItem("itemNumbers");
  let alertIcon = document.querySelector(".red-alert");

  if (itemNumberInCart) {
    alertIcon.setAttribute("style", "visibility: visible;");
    alertIcon.textContent = itemNumberInCart;
  } else {
    alertIcon.setAttribute("style", "visibility: hidden;");
  }
}

// Bestseller Products //

const fetchBestsellerProducts = () => {
  fetch("data-json/bestSeller.json")
    .then((res) => res.json())
    .then((data) => {
      let bestsellerProductData = data;
      for (var i = 0; i <= 9; i++) {
        bestsellerProductContainer.innerHTML += `
        <div class="swiper-slide widget-swiper swiper-lazy">
        <div class="widget-swiper">
          <img class="product-img" src=${bestsellerProductData[i].img} />
          <div>
          <span class="product-rating"><i class="fas fa-star"></i> ${bestsellerProductData[i].rating}</span>
          <span class="product-comment">(${bestsellerProductData[i].comment} Yorum)</span>
          </div>
          <span class="product-code">${bestsellerProductData[i].code}</span>
          <h6 class="product-title">${bestsellerProductData[i].title}</h6>
          <p class="product-price">₺${bestsellerProductData[i].price}</p>
          <div class="shipping-info">BUGÜN KARGODA</div>
        </div>
        </div>
       `;
      }
    });
};

//Run Functions OnPageLoad //

document.addEventListener("DOMContentLoaded", () => {
  fetchRelatedProducts();
  fetchBestsellerProducts();
  onLoadAlertIconValue();
});
