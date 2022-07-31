document.querySelector("#sw-darkmode").addEventListener("click", () => {
  document.body.classList.toggle("darkmode");
});

var email_ = ""
var currentid_ = ""
var img_ = ""

// check xem đã đăng nhập hay chưa
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(user.email);
    email_ = user.email
    img_ = user.photoURL
    loadchat(user.email);
    console.log(user);
    renderCurrentUser(user.photoURL, user.displayName);
    setUpConversationchange(email_)
    // ...
  } else {
    // User is signed out
    sweetAlert("warning", "bạn cần đăng nhập");
    setTimeout(() => {
      open("../signin/index.html", "_self");
    }, 3000);
  }
});

let signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

let clock = () => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let d = date.getDay();

  if (m < 10) {
    m = "0" + m;
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (s < 10) {
    s = "0" + s;
  }
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var n = weekday[d];

  return ` ${h}:${m}:${s}     ${n}`;
};

let loadchat = async (email) => {
  let result = await firebase
    .firestore()
    .collection("chat")
    .where("users", "array-contains", email)
    .get();
  console.log(result);
  let data = getDataFromDocs(result.docs);
  console.log(data);

  renderChat(data[0], email);
  renderUserList(data, email);
};

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

let sweetAlert = (icon, message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: message,
  });
};

let renderChat = (data, ownerEmail) => {
  let chat = data.chat;
  currentid_ = data.id
  
  let dom = document.querySelector(".chat-panel");
  dom.innerHTML = "";

  for (let i = 0; i < chat.length; i++) {
    let html = `<div class="no-gutters">
    <div class="col-md-5 ${chat[i].email == ownerEmail ? "offset-md-7" : ""}">
      <div class="chat-bubble ${
        chat[i].email == ownerEmail
          ? "chat-bubble--blue chat-bubble--right"
          : "chat-bubble--left"
      } ">
      <p>${chat[i].email}</p>  
      ${chat[i].content}
      </div>
    </div>
  </div>`;

    dom.innerHTML += html;
  }

  let chat_scroll = document.querySelector(".chat-panel")
  chat_scroll.scrollTop = chat_scroll.scrollHeight
};

let renderUserList = (data, email) => {
  let dom = document.querySelector(".list-friend");
  dom.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let html = `<div id="c${data[i].id}" class="friend-drawer friend-drawer--onhover">
    <img src="${data[i].avatar}" alt="" class="profile-image">
    <div class="text">
      <h6>${data[i].name}</h6>
    </div>
    <span class="time text-muted small">
      ${data[i].timeStart}
    </span>
  </div>
  <hr>`;

    dom.innerHTML += html;
  }

  for (let i = 0; i < data.length; i++) {
    let user = document.querySelector(`#c${data[i].id}`);
    user.addEventListener("click", () => {
      renderChat(data[i], email);
    });
  }
};

let renderCurrentUser = (photo, userName) => {
  document.querySelector("#userImg").src = photo;
  document.querySelector("#userName").innerHTML = userName;
};

setInterval(() => {
  document.querySelector("#realTime").innerHTML = clock();
}, 1000);

let formChat = document.querySelector("#chat_input_form");
formChat.onsubmit = (e) => {
  e.preventDefault();

  let content = formChat.chat.value.trim();

  updateNewMessage(content, email_, img_, clock(), currentid_)
  formChat.chat.value = ""
};

let updateNewMessage = async (content, email, img, time, currentID) => {
  if (currentID) {
    let conversationId = currentID;
    let message = {
      content: content,
      time: time,
      img: img,
      email: email,
    };
    await firebase
      .firestore()
      .collection("chat")
      .doc(conversationId)
      .update({
        chat: firebase.firestore.FieldValue.arrayUnion(message),
      });
  }
};


let setUpConversationchange =  async (email) => {
  let skipRun = true
  let currentEmail = email
  firebase.firestore()
  .collection('chat')
  .where('users', 'array-contains', currentEmail)
  .onSnapshot(function (snapshot) {
      if (skipRun) {
          skipRun = false
          return
      }

      let docChanges = snapshot.docChanges()
      for (let docChange of docChanges) {
          let type = docChange.type
          let conversationDoc = docChange.doc
          let data = getDataFromDoc(conversationDoc)

          if (type == 'modified') {
            renderChat(data, email_)
          }
          if(type == 'added'){
              
          }
      }
  })

}


let addConversation = async (data) => {
  await firebase.firestore().collection('chat').add(data)
}

document.querySelector("#addConversation_btn").addEventListener("click", () => {
  let chatName = document.querySelector("#addConversation_Name").value
  let users = document.querySelector("#addConversation_Users").value
  let listUsers = users.trim().split(" ")
  if (email_) {
    listUsers.push(email_)
  }
  let photo = document.querySelector("#addConversation_Photo").files[0]

  const ref = firebase.storage().ref();
  const metadata = {
    contentType: photo.type,
  };
  const name = photo.name;

  const Upload = ref.child(name).put(photo, metadata);
  Upload.then((snapshot) => snapshot.ref.getDownloadURL()).then((url) => {
    let data = {
      avatar: url,
      chat: [],
      name: chatName,
      timeStart: clock(),
      users: listUsers,
    };
    addConversation(data);
  });
})

