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
      entry.target.classList.add("show_left");
    } else {
      entry.target.classList.remove("show_left");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden_left");
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
  window.location.href = `/single${productId}`;
}

//getting product id to add it in the cart
const alertFunction = (ProductID) => {
  addtoCart(ProductID);
};
//function to add elements in the cart array

const addtoCart = (ProductID) => {
  let positionTheProductInCart = carts.findIndex((value) => value.product_id == ProductID);
  if (carts.length <= 0) {
    //1st element added
    carts = [
      {
        product_id: ProductID,
        quantity: 1,
      },
    ];
  } else if (positionTheProductInCart < 0) {
    //check if new element is add if not then go to else statement
    carts.push({
      product_id: ProductID,
      quantity: 1,
    });
  } else {
    carts[positionTheProductInCart].quantity += 1; //increase quantity if already exists
  }
  addCarttoHTML();
  console.log(carts);
};
const addCarttoHTML = () => {
  const cartHTML = document.querySelector("#cart tbody");
  if (cartHTML) {
    cartHTML.innerHTML = '';
  }
  if (Array.isArray(listProduct) && carts.length > 0) {
    carts.forEach((cart) => {
      let newCart = document.createElement("tr");
      let productPosition = listProduct.findIndex((value) => value.id == cart.product_id);
      let info = listProduct[productPosition];
      newCart.innerHTML = `
            <td><img src="${info.image}"></td>
                    <td>${info.name}</td>
                    <td>${cart.quantity}</td>
                    <td>Rs.${info.price}</td>
                    <td><a href="#"><i class="far fa-times-circle"></i></a></td>
            `;
    });
    console.log(newCart);
    cartHTML.appendChild(newCart);
  }
};

const initApp = () => {

  fetch("/product.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      addDatatoHTML("shirt", listProduct.shirt);
      addDatatoHTML("two_piece", listProduct.twoPiece);
      addDatatoHTML("trouser", listProduct.trouser);
      addDatatoHTML("men_shoes", listProduct.menShoe);
      addDatatoHTML("women_shoes", listProduct.womenShoe);
      console.log(typeof(listProduct))
    });
};
initApp();
