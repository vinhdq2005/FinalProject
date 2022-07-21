firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

loadProduct()

async function loadProduct() {
  let result = await firebase
  .firestore()
  .collection("shop")
  .get();
  // console.log(result);
  let data = getDataFromDocs(result.docs)
  console.log(data[0].product.length);
  console.log(data);
  renderProduct(data)
}

let getDataFromDoc = (doc) => {
  let data = doc.data()
  data.id = doc.id
  return data
}

let getDataFromDocs = (docs) => {
  let result = []
  for (let doc of docs) {
    let data = getDataFromDoc(doc)
    result.push(data)
  }
  return result
}

let renderProduct = (data) => {
  let topSalesProduct = document.querySelector("#product_container_topSales")
  let featureWatch = document.querySelector("#feature_watches")
  let newArrival = document.querySelector("#new_arrivals")

  topSalesProduct.innerHTML = ""
  featureWatch.innerHTML = ""
  newArrival.innerHTML = ""

  for (let i = 0; i < data[0].product.length; i++) {
    let html = `<div class="box">
    <div class="box-content">
      <div class="img-box">
        <img src="${data[0].product[i].img}" alt="">
      </div>
      <div class="detail-box">
        <div class="text">
          <h6>
            ${data[0].product[i].name}
          </h6>
          <h5>
            <span>$</span> ${data[0].product[i].price}
          </h5>
        </div>
        <div class="like">
          <h6>
            Like
          </h6>
          <div class="star_container">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <a href="">
        Add To Cart
      </a>
    </div>
  </div>`

  topSalesProduct.innerHTML += html
  }

  for (let i = 0; i < data[1].product.length; i++) {
    let html = `        <div class="box">
    <div class="box-content">
      <div class="img-box">
        <img src="${data[1].product[i].img}" alt="">
      </div>
      <div class="detail-box">
        <div class="text">
          <h6>
            ${data[1].product[i].name}
          </h6>
          <h5>
            <span>$</span> ${data[1].product[i].price}
          </h5>
        </div>
        <div class="like">
          <h6>
            Like
          </h6>
          <div class="star_container">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <a href="">
        Add To Cart
      </a>
    </div>
  </div>`

  featureWatch.innerHTML += html
  }

  for (let i = 0; i < data[2].product.length; i++) {
    let html = `        <div class="box">
    <div class="box-content">
      <div class="img-box">
        <img src="${data[2].product[i].img}" alt="">
      </div>
      <div class="detail-box">
        <div class="text">
          <h6>
          ${data[2].product[i].name}
          </h6>
          <h5>
            <span>$</span> ${data[2].product[i].price}
          </h5>
        </div>
        <div class="like">
          <h6>
            Like
          </h6>
          <div class="star_container">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <a href="">
        Add To Cart
      </a>
    </div>
  </div>`

  newArrival.innerHTML += html
  }
}