const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navlink");
if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

const observerr = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show_up");
    } else {
      entry.target.classList.remove("show_up");
    }
  });
});
const hiddenrElements = document.querySelectorAll(".hidden_up");
hiddenrElements.forEach((el) => observerr.observe(el));

let listProduct = [];
let carts = []; // for shopping cart

//adding data from json to index page
const addDatatoHTML = (ele, prodList) => {
  const listHTML = document.querySelector(`#${ele}`);
  listHTML.innerHTML = "";
  if (prodList.length > 0) {
    prodList.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("pro");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onclick="redirectToPage(${product.id})">
                <h3>${product.name}</h3>
                <h4>From Rs.${product.price}</h4>
                <a href="#" onclick=alertFunction(${product.id})><i class="fa-solid fa-cart-shopping cart"></i></a>
            `;
      listHTML.appendChild(newProduct);
    });
  }
};

function redirectToPage(productId) {
  window.location.href = `/single/${productId}`;   // '/' so that whenever clicked inside another it will get redirected to the page!!
}

//getting product id to add it in the cart
const alertFunction = (ProductID) => {
  addtoCart(ProductID);
};
//function to add elements in the cart array

const addtoCart = (ProductID) => {
    let carts = JSON.parse(localStorage.getItem('carts')) || [];
    let positionTheProductInCart = carts.findIndex((value) => value.product_id == ProductID);
    if (carts.length <= 0 || positionTheProductInCart < 0) {
      carts.push({
        product_id: ProductID,
        quantity: 1,
      });
    } else {
      carts[positionTheProductInCart].quantity += 1;
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    alert('Product added to cart!');
  };

  const renderCart = () => {
    const cartHTML = document.querySelector("#cart tbody");
    if (cartHTML) {
      cartHTML.innerHTML = '';
      const carts = JSON.parse(localStorage.getItem('carts')) || [];
      if (carts.length > 0) {
        carts.forEach((cart) => {
          let info = null;
          for (let category in listProduct) {
            if (Array.isArray(listProduct[category])) {
              info = listProduct[category].find(item => item.id == cart.product_id);
              if (info) break;
            }
          }
          if (info) {
            let newCart = document.createElement("tr");
            newCart.innerHTML = `
              <td><img src="${info.image}" alt="${info.name}"></td>
              <td>${info.name}</td>
              <td><input type="number" value="${cart.quantity}" min="1" onchange="updateQuantity(${cart.product_id}, this.value)"></td>
              <td>Rs.${info.price * cart.quantity}</td>
              <td><a href="#" onclick="removeFromCart(${cart.product_id})"><i class="far fa-times-circle"></i></a></td>
            `;
            cartHTML.appendChild(newCart);
          }
        });
      } else {
        cartHTML.innerHTML = '<br><tr><td colspan="5">Your cart is empty</td></tr><br>';
        
      }
    }
  };

  function removeFromCart(productId) {
    let carts = JSON.parse(localStorage.getItem('carts')) || [];
    carts = carts.filter(item => item.product_id != productId);
    localStorage.setItem('carts', JSON.stringify(carts));
    renderCart();
  }


const loadProducts = () => {
    return fetch("/product.json")
      .then((response) => response.json())
      .then((data) => {
        listProduct = data;
        // console.log('Loaded products:', listProduct);
        return data;
      });
  };

  const initApp = () => {
    loadProducts().then(() => {
      if (window.location.pathname === '/' || window.location.pathname === '/index' ) {
        // Home page
        addDatatoHTML("shirt", listProduct.shirt);
        addDatatoHTML("two_piece", listProduct.twoPiece);
        addDatatoHTML("trouser", listProduct.trouser);
        addDatatoHTML("men_shoes", listProduct.menShoe);
        addDatatoHTML("women_shoes", listProduct.womenShoe);
        addDatatoHTML("one_piece", listProduct.onePiece);
      }else if(window.location.pathname.startsWith('/single')){
        if(document.getElementById('shirt')){
            addDatatoHTML("shirt", listProduct.shirt);
        }
        if(document.getElementById('two_piece')){
            addDatatoHTML("two_piece", listProduct.twoPiece);
        }
        if(document.getElementById('trouser')){
            addDatatoHTML("trouser", listProduct.trouser);
        }
        if(document.getElementById('men_shoes')){
            addDatatoHTML("men_shoes", listProduct.menShoe);
        }
        if(document.getElementById('women_shoes')){
            addDatatoHTML("women_shoes", listProduct.womenShoe);
        }
        if(document.getElementById('one_piece')){
          addDatatoHTML("one_piece", listProduct.onePiece);
      }

      } else if (window.location.pathname === '/bag') {
        // Bag page
        renderCart();
      }
    });
  };
initApp();
