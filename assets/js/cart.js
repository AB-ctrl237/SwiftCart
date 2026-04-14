function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-container");
  if (!cartContainer) return;

  cartContainer.innerHTML = cart
    .map((item) => {
      const shortTitle = item.title.split(" ").slice(0, 3).join(" ");

      return `
        <li class="cart-list">
          <img src="${item.image}" alt="${item.title}">
       
            <h3>${shortTitle}</h3>
            <p>$${item.price}</p>
             <button  class="minus">-</button>
              <span class="count"> 0</span>
              <button class="plus">+</button>
              <button class="reset">reset</button>
        </li>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderCart);
const cards = document.querySelectorAll(".cart-list");

cards.forEach((cart, index) => {
  const countText = cart.querySelector(".count");
  const plus = cart.querySelector(".plus");
  const minus = cart.querySelector(".minus");
  const reset = cart.querySelector(".reset");

  let count = 0;

  // Load saved count (optional)
  const saved = localStorage.getItem(`count-${index}`);
  if (saved) {
    count = parseInt(saved);
    countText.textContent = count;
  }

  plus.addEventListener("click", () => {
    count++;
    countText.textContent = count;
    localStorage.setItem(`count-${index}`, count);
  });

  minus.addEventListener("click", () => {
    if (count > 0) {
      count--;
      countText.textContent = count;
      localStorage.setItem(`count-${index}`, count);
    }
  });

  reset.addEventListener("click", () => {
    count = 0;
    countText.textContent = count;
    localStorage.setItem(`count-${index}`, count);
  });
});


//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   const cartContainer = document.getElementById("cart-container");
//   if (!cartContainer) return;

//   cartContainer.innerHTML = cart
//     .map(
//       (item) => `
//         <li class="cart-list">
//           <img src="${item.image}" alt="${item.title}">
//           <div class="cart-item-info">
//             <h3>${item.title}</h3>
//             <p>$${item.price}</p>
//           </div>
//         </li>
//       `,
//     )
//     .join("");
// }

// document.addEventListener("DOMContentLoaded", renderCart);
