window.onload = () => {
  const stringCartStore = window.localStorage.getItem("cart");

  let cartStore;

  if (stringCartStore !== null) {
    cartStore = JSON.parse(stringCartStore);
  } else {
    cartStore = {};
  }

  renderCartItem(cartStore);
};

const renderCartItem = (store) => {
  const container = document.getElementById("cart-container");

  const keys = Object.keys(store);

  if (keys.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "flex-col justify-center items-center";

    const text = document.createElement("h3");
    text.innerText = "Belum ada barang di keranjang";

    emptyState.appendChild(text);

    container.appendChild(emptyState);
  } else {
    keys.forEach((key) => {
      const item = store[key];
      // build cart item Card element
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      // add image to the card
      const productImage = document.createElement("img");
      productImage.src = `../../assets/${item["productImage"]}`;
      productImage.className = "image-item";

      // add item data (title and price)
      const content = document.createElement("div");
      content.className = "flex-col gap-1 w-full";
      content.id = key;

      const title = document.createElement("h3");
      title.innerText = `Nama produk: ${item["productName"]}`;

      const price = document.createElement("h4");
      price.innerText = `Harga produk: ${item["productPrice"]}`;

      const actionContainer = document.createElement("div");
      actionContainer.className = "flex-row gap-1 items-center w-full";

      const subtotalContainer = document.createElement("div");
      subtotalContainer.className = "flex-col gap-1 w-full subtotal";

      let Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });

      const subtotalCalculation = document.createElement("h3");
      subtotalCalculation.innerText = `${item["quantity"]} x ${item["productPrice"]}`;

      const subtotalResult = document.createElement("h4");
      subtotalResult.innerText = `Subtotal: ${Rupiah.format(
        Number(item["quantity"]) * getPriceInNumber(item["productPrice"])
      )}`;

      const deleteItem = document.createElement("span");
      deleteItem.className = "material-icons-outlined cursor-pointer";
      deleteItem.innerText = "delete";

      deleteItem.addEventListener("click", () => {
        const stringCartStore = window.localStorage.getItem("cart");

        let cartStore;

        if (stringCartStore !== null) {
          cartStore = JSON.parse(stringCartStore);
        } else {
          cartStore = {};
        }

        if (confirm(`Yakin mau menghapus ${item["productName"]}?`)) {
          delete cartStore[key];

          window.localStorage.setItem("cart", JSON.stringify(cartStore));
          window.location.reload();
        }
      });

      subtotalContainer.appendChild(subtotalCalculation);
      subtotalContainer.appendChild(subtotalResult);

      actionContainer.appendChild(subtotalContainer);
      actionContainer.appendChild(deleteItem);

      content.appendChild(title);
      content.appendChild(price);

      cartItem.appendChild(productImage);
      cartItem.appendChild(content);
      cartItem.appendChild(actionContainer);

      container.appendChild(cartItem);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "w-full flex-col items-center justify-center";

    const whatsappButton = document.createElement("a");
    whatsappButton.className = "cta-btn";
    whatsappButton.innerText = "Checkout via Whatsapp";
    whatsappButton.href = `https://wa.me/+6285179893859?text=${encodeURIComponent(
      "Halo, saya mau checkout ini ya\n\n" +
        processCheckout(store) +
        "\nPembayarannya bagaimana?"
    )}`;

    buttonContainer.appendChild(whatsappButton);

    container.appendChild(buttonContainer);
  }
};

const processCheckout = (store) => {
  const keys = Object.keys(store);

  let listItems = "";

  keys.forEach((key, index) => {
    const item = store[key];
    listItems += `${index + 1}. ${item["quantity"]} x ${item["productName"]}\n`;
  });

  return listItems;
};

const getPriceInNumber = (priceInString) => {
  const splitCurrent = priceInString.split("Rp ")[1];

  return Number(splitCurrent.split(".").join(""));
};
