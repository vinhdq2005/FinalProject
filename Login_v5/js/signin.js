let form_ = document.getElementById("signin");

form_.onsubmit = (e) => {
  e.preventDefault();

  setError("email_err", "");
  setError("password_err", "");

  let email = form_.email.value;
  let password = form_.password.value;

  let check = true;

  if (!email) {
    check = false;
    setError("email_err", "Email is required");
  }
  if (!password) {
    check = false;
    setError("password_err", "Password is required");
  }
  if (check) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        open("../index.html", "_self");
        // if (user.emailVerified) {
        //   sweetAlert("success", "Welcome back!")

        //   open("../updateAccount.html", "_self")
        // } else {
        //   sweetAlert("error", "Please verify your email")
        // }
      })
      .catch((error) => {
        var errorMessage = error.message;
        sweetAlert("error", errorMessage);
      });
  }
};

let sweetAlert = (icon, message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icon,
      title: message
    })
  }

let setError = (query, content) => {
  document.getElementById(query).innerHTML = content;
};
