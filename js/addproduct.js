
let form_update = document.querySelector("#form_update");

var currentid_ =""

form_update.onsubmit = (e) => {
  e.preventDefault();

  let productName = form_update.nameProduct.value;
  let price = form_update.price.value;
  let photo = form_update.photo.files[0];
//   console.log(photo);

  const ref = firebase.storage().ref();
  const metadata = {
    contentType: photo.type,
  };
  const name = photo.name;

  const Upload = ref.child(name).put(photo, metadata);

  if (document.getElementById("flexRadioDefault1").checked) {
    currentid_ = "QmcwRB5ogo0EtScDzsjT"
  } else if (document.getElementById("flexRadioDefault2").checked) {
    currentid_ = "TVYc07qNLa5J8I2hG4Tn"
  } else if (document.getElementById("flexRadioDefault3").checked) {
    currentid_ = "bRtjeaNHwBL3MYNCiBkg"
  }

  Upload.then((snapshot) => snapshot.ref.getDownloadURL()).then((url) =>
    addProduct(productName, price, url)
  );
};


let addProduct = async (productName, price, photo) => {
    let data= {
        name: productName,
        price: price,
        img: photo,
    }
    await firebase.firestore().collection("shop").doc(currentid_).update({
      product: firebase.firestore.FieldValue.arrayUnion(data)
    })
  };


