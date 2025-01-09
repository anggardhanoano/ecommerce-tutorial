window.onload = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const price = queryParams.get("price");
  const name = queryParams.get("name");
  const img = queryParams.get("img");
  const rating = Number(queryParams.get("rating"));

  populateDetailData(price, name, img, rating);
};

const populateDetailData = (productPrice, productName, productImg, rating) => {
  const nameElement = document.getElementById("product-name");
  const priceElement = document.getElementById("product-price");
  const imgElement = document.getElementById("product-img");
  const ratingContainerElement = document.getElementById("product-rating");

  const stars = [];

  for (let i = 0; i < rating; i += 1) {
    const star = document.createElement("span");

    star.className = "material-icons-outlined red";
    star.innerText = "star";

    stars.push(star);
  }

  for (let j = 0; j < 5 - rating; j += 1) {
    const star = document.createElement("span");

    star.className = "material-icons-outlined";
    star.innerText = "star";

    stars.push(star);
  }

  nameElement.innerText = productName;
  priceElement.innerText = productPrice;
  imgElement.src = `../../../assets/${productImg}`;

  stars.forEach((star) => {
    ratingContainerElement.appendChild(star);
  });
};

const countProductIncrement = (element) => {
  const counter = element.parentElement.getElementsByClassName("counter")[0];

  counter.innerText = Number(counter.innerText) + 1;
};

const countProductDecrement = (element) => {
  const counter = element.parentElement.getElementsByClassName("counter")[0];

  if (Number(counter.innerText) > 1) {
    counter.innerText = Number(counter.innerText) - 1;
  }
};

const addToCartDetail = (element) => {
  const counter =
    element.parentElement.getElementsByClassName("counter")[0].innerText;

  const queryParams = new URLSearchParams(window.location.search);

  const price = queryParams.get("price");
  const name = queryParams.get("name");
  const img = queryParams.get("img");

  const stringCartStore = window.localStorage.getItem("cart");

  let cartStore;

  if (stringCartStore !== null) {
    cartStore = JSON.parse(stringCartStore);
  } else {
    cartStore = {};
  }

  cartStore[name.split(" ").join("-").toLowerCase()] = {
    productName: name,
    productPrice: price,
    productImage: img,
    quantity: counter,
  };

  window.localStorage.setItem("cart", JSON.stringify(cartStore));

  alert(`Berhasil memasukan ${name} ke keranjang`);
};
