console.log("HALO DARI LANDING");

function onProductClick(element) {
  const productItemElement = element.parentElement.parentElement;
  const productName =
    productItemElement.getElementsByTagName("h3")[0].innerText;
  const productImg =
    element.parentElement.parentElement.getElementsByTagName("img")[0].src;
  const productPrice =
    productItemElement.getElementsByClassName("price")[0].innerText;
  const productRating = productItemElement.getElementsByClassName("red").length;
  const parentDirSplitBySlash = window.location.pathname.split("/");

  const splitDir = parentDirSplitBySlash.slice(
    0,
    parentDirSplitBySlash.length - 1
  );

  splitDir.push("detail.html");

  const finalDir = splitDir.join("/");

  window.location.href = `${finalDir}?name=${productName}&price=${productPrice}&rating=${productRating}&img=${productImg}`;
}
