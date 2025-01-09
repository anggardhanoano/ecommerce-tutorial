const onClickBestSellingProduct = (e) => {
  const productPrice = e.getElementsByTagName("h4")[0].innerText;
  const productName = e.getElementsByTagName("h3")[0].innerText;
  const productImg = e.getElementsByTagName("img")[0].src.split("/assets/")[1];
  const productRating = e.getElementsByClassName(
    "material-icons-outlined"
  ).length;

  const rootDir = window.location.pathname.split("/pages/")[0];

  window.location.href = `${rootDir}/pages/produk/detail.html?price=${productPrice}&name=${productName}&img=${productImg}&rating=${productRating}`;
};

const onClickDetailProduct = (e) => {
  const productPrice =
    e.parentElement.parentElement.getElementsByTagName("h4")[0].innerText;
  const productName =
    e.parentElement.parentElement.getElementsByTagName("h3")[0].innerText;
  const productImg = e.parentElement.parentElement
    .getElementsByTagName("img")[0]
    .src.split("/assets/")[1];
  const productRating =
    e.parentElement.parentElement.getElementsByClassName("red").length;

  const rootDir = window.location.pathname.split("/pages/")[0];

  window.location.href = `${rootDir}/pages/produk/detail.html?price=${productPrice}&name=${productName}&img=${productImg}&rating=${productRating}`;
};

const addToCart = (element) => {
  const productPrice =
    element.parentElement.parentElement.getElementsByTagName("h4")[0].innerText;
  const productName =
    element.parentElement.parentElement.getElementsByTagName("h3")[0].innerText;
  const productImg = element.parentElement.parentElement
    .getElementsByTagName("img")[0]
    .src.split("/assets/")[1];

  const stringCartStore = window.localStorage.getItem("cart");

  let cartStore;

  if (stringCartStore !== null) {
    cartStore = JSON.parse(stringCartStore);
  } else {
    cartStore = {};
  }

  cartStore[productName.split(" ").join("-").toLowerCase()] = {
    productName: productName,
    productPrice: productPrice,
    productImage: productImg,
    quantity: 1,
  };

  window.localStorage.setItem("cart", JSON.stringify(cartStore));

  alert(`Berhasil memasukan ${productName} ke keranjang`);
};
