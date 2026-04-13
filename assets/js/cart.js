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
         
        </li>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderCart);



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