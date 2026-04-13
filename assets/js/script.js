// const API="https://fakestoreapi.com"
const API = "https://fakestoreapi.com/products";
try {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const grid = document.querySelector(".product-grid");

      grid.innerHTML = data
        .map(
          (product) => `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title.substring(0, 20)}...</h3>
        <p>$${product.price}</p>
        <button onclick='addToCart(${JSON.stringify(product)})'>
          Add to Cart
        </button>
      </div>
    `,
        )
        .join("");
    })
    .catch((err) => console.log(err));
} catch (err) {
  console.log("Error:", err);
}

function loadCategory(type) {
  let category = "";

  if (type === "men") {
    category = "men's clothing";
  } else if (type === "women") {
    category = "women's clothing";
  }

  const container = document.getElementById("category-products");

  fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
  )
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = "";

      data.forEach((product) => {
        container.innerHTML += `
          <div class="card">
            <img src="${product.image}">
            <h3>${product.title.substring(0, 20)}...</h3>
            <p>$${product.price}</p>
            <button onclick='addToCart(${JSON.stringify(product)})'>
              Add to Cart
            </button>
          </div>
        `;
      });
    })
    .catch((err) => console.log(err));
}

let btn = document.getElementById("products")
let electronicBtn = document.getElementById("electronic-btn")
  electronicBtn.addEventListener("click",()=>{
   btn.style.display="flex"
  });
 
function loadProducts(category) {
  const grid = document.querySelector("#products");

  fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
  )
    .then((res) => res.json())
    .then((data) => {
      grid.innerHTML = "";

      data.forEach((product) => {
        grid.innerHTML += `
          <div class="card">
            <img src="${product.image}">
            <h3>${product.title.substring(0, 20)}...</h3>
            <p>$${product.price}</p>
            <button onclick='addToCart(${JSON.stringify(product)})'>
              Add to Cart
            </button>
          </div>
        `;
      });
    });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  if (typeof renderCart === "function") {
    renderCart();
  }
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-container");
  if (!cartContainer) return;

  cartContainer.innerHTML = cart
    .map(
      (item) => `
        <li class="cart-list">
          <img src="${item.image}" alt="${item.title}">
          <p>${item.title}</p>
          <p>$${item.price}</p>
        </li>
      `,
    )
    .join("");
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  console.log("cart is", cart);

  let cartContainer = document.getElementById("cart-container");

  cartContainer.innerHTML = cart.map(
    (item) => console.log(item)`
   <h1> ${item.title}</h1>
  
  `,
  );
}

function handalsend() {
  window.location.href = "indix.html";
}
// login btn working

let login = document.querySelector("#loginBtn");
login.addEventListener("click", () => {
  let container = document.querySelector("#loginBg");
  container.style.display = "block";
  document.body.style.overflow = "hidden";
});

let formBtn = document.querySelector("#logBtn");

formBtn.addEventListener("click", () => {
  let email = document.querySelector(".logint").value.trim();
  let password = document.querySelector(".logint").value.trim();
  let errorMsg = document.querySelector("#error");

  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // validation
  if (!emailRegex.test(email)) {
    errorMsg.innerHTML = "Invalid email";
    return;
  }

  if (!passwordRegex.test(password)) {
    errorMsg.innerHTML =
      "Password must be at least 8 characters, include letters and numbers";
    return;
  }

  // get stored users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check user exists

  if (!Array.isArray(users)) {
    users = [users];
  }

  let validUser = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (validUser) {
    // login success
    localStorage.setItem("isLoggedIn", "true");

    document.querySelector("#loginBtn").style.display = "none";
    document.querySelector("#signBtn").style.display = "none";
    document.querySelector("#logoutBtn").style.display = "block";

    errorMsg.innerHTML = "Login Successful ";
  } else {
    errorMsg.innerHTML = "User not found ";
  }
});

// Sign up btn working
let Sign = document.querySelector("#SignBtn");
Sign.addEventListener("click", () => {
  let container = document.querySelector("#SignBg");
  container.style.display = "block";
  document.body.style.overflow = "hidden";
});

let SignBtn = document.querySelector("#SignupBtn");
let data = document.querySelectorAll(".SignupInt");
let errorMsg = document.querySelector("#error"); // Element to show errors

SignBtn.addEventListener("click", (p) => {
  let container = document.querySelector("#SignBg");
  let bbtn = document.querySelector("#bbtn");
  let logout = document.querySelector("#logoutBtn");

  let email = data[0].value.trim();
  let userName = data[1].value.trim();
  let password = data[2].value.trim();

  // Email regex
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password regex: min 8 chars, at least 1 letter and 1 number
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!emailRegex.test(email)) {
    errorMsg.innerHTML = "Invalid email";
    return; // Stop if email invalid
  }

  if (!passwordRegex.test(password)) {
    errorMsg.innerHTML =
      "Password must be at least 8 characters, include letters and numbers";
    return; // Stop if password invalid
  }

  // Save to localStorage

  let data12 = {
    username: userName,
    email: email,
    password: password,
  };

  localStorage.setItem("users", JSON.stringify(data12));

  // Hide signup container
  container.style.display = "none";

  // Clear error
  errorMsg.innerHTML = "";

  login.remove();
  bbtn.remove();
  logout.style.display = "block";
});

let displayP = document.getElementById("user");
let namedata = JSON.parse(localStorage.getItem("users"));
console.log(namedata);
displayP.innerHTML = `welcome  ${namedata.username} `;

// document.addEventListener("DOMContentLoaded", () => {
//   const loginBtn = document.getElementById("loginBtn");
//   const signupBtn = document.getElementById("signupBtn");
//   const logoutBtn = document.getElementById("logoutBtn");
//   const userName = document.getElementById("userName");

//   // check login state
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const user = JSON.parse(localStorage.getItem("currentUser"));

//   if (isLoggedIn === "true" && user) {
//     showUser(user);
//   } else {
//     showAuthButtons();
//   }

// logout
//   logoutBtn.addEventListener("click", () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("currentUser");

//     showAuthButtons();
//   });

//   function showUser(user) {
//     loginBtn.style.display = "none";
//     signupBtn.style.display = "none";

//     userName.textContent = `Welcome, ${user.name}`;
//     logoutBtn.style.display = "inline-block";
//   }

//   function showAuthButtons() {
//     loginBtn.style.display = "inline-block";
//     signupBtn.style.display = "inline-block";

//     userName.textContent = "";
//     logoutBtn.style.display = "none";
//   }
// });
