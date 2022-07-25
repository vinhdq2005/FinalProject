let dataProductforSearch = []

// check xem đăng nhập hay chưa
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(user.displayName);
    renderUserName(user.displayName);
    let signOutButton = document.querySelector("#signOutBtn")
    signOutButton.classList.remove("hidden")
    // ...
    let userName = document.querySelector(".userName")
    userName.href = "#"
  } else {
    // User is signed out
    // ...

  }
});

let signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      location.reload()
    })
    .catch((error) => {
      // An error happened.
    });
};

let renderUserName = (userName) => {
  let displayName = document.querySelector(".displayName");

  displayName.innerHTML = userName;
};

loadProduct();

async function loadProduct() {
  let result = await firebase.firestore().collection("shop").get();
  // console.log(result);
  let data = getDataFromDocs(result.docs);
  console.log(data[0].product.length);
  console.log(data);
  renderProduct(data);

  for (let i = 0; i < data.length; i++) {
    for (let k = 0; k < data[i].product.length; k++) {
      dataProductforSearch.push(data[i].product[k])
    }
    
  }
  console.log(dataProductforSearch);
}

let getDataFromDoc = (doc) => {
  let data = doc.data();
  data.id = doc.id;
  return data;
};

let getDataFromDocs = (docs) => {
  let result = [];
  for (let doc of docs) {
    let data = getDataFromDoc(doc);
    result.push(data);
  }
  return result;
};



let renderProduct = (data) => {
  let topSalesProduct = document.querySelector("#product_container_topSales");
  let featureWatch = document.querySelector("#feature_watches");
  let newArrival = document.querySelector("#new_arrivals");

  topSalesProduct.innerHTML = "";
  featureWatch.innerHTML = "";
  newArrival.innerHTML = "";

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
      <a href="" class="addToCartbtn">
        Add To Cart
      </a>
    </div>
  </div>`;

    topSalesProduct.innerHTML += html;
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
      <a href="" class="addToCart-btn">
        Add To Cart
      </a>
    </div>
  </div>`;

    featureWatch.innerHTML += html;
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
      <a href=""  class="addToCart-btn">
        Add To Cart
      </a>
    </div>
  </div>`;

    newArrival.innerHTML += html;
  }


};


// cart
let openCarticon = document.querySelector(".cart-icon");
let closeCarticon = document.querySelector(".close-cart");
let cartNavbar = document.querySelector(".cart");
let cartContainer = document.querySelector(".cart-container");

function showCart() {
  cartNavbar.classList.add("open-cart");
}
function closeCart() {
  cartNavbar.classList.remove("open-cart");
}

openCarticon.addEventListener("click", showCart);
closeCarticon.addEventListener("click", closeCart);
cartContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

// search


// let searchForm = document.querySelector("#search-form")
// let searchData = document.querySelector("#result")


// let renderDataSearch = (data) => {
//   searchData.innerHTML = ""

//   for(let i = 0; i < data.length; i++) {
//     let html = `<div class="box">
//     <div class="box-content">
//       <div class="img-box">
//         <img src="${data[i].img}" alt="">
//       </div>
//       <div class="detail-box">
//         <div class="text">
//           <h6>
//             ${data[i].name}
//           </h6>
//           <h5>
//             <span>$</span> ${data[i].price}
//           </h5>
//         </div>
//         <div class="like">
//           <h6>
//             Like
//           </h6>
//           <div class="star_container">
//             <i class="fa fa-star" aria-hidden="true"></i>
//             <i class="fa fa-star" aria-hidden="true"></i>
//             <i class="fa fa-star" aria-hidden="true"></i>
//             <i class="fa fa-star" aria-hidden="true"></i>
//             <i class="fa fa-star" aria-hidden="true"></i>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div class="btn-box" >
//       <a href="" class = "addToCart-btn">
//         Add To Cart
//       </a>
//     </div>
//   </div>`;

//   searchData.innerHTML += html;
//   }
// }

// searchForm.addEventListener("keyup", (e) => {
//   // e.preventDefault()
//   const searchString = e.target.value.toLowerCase()

//   const filterProduct = dataProductforSearch.filter((d) => {
//     return (
//       d.name.toLowerCase().includes(searchString) 
//     )
//   })
//   renderDataSearch(filterProduct)
//   console.log(filterProduct);
// })

// add to cart



