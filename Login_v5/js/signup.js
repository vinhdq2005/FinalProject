let form_ = document.getElementById("signup")

form_.onsubmit = (e) => {
    e.preventDefault()

   setError("username_err", "")
   setError("email_err", "")
   setError("password_err", "")
   setError("cfpassword_err", "")

    let userName = form_.username.value
    let email = form_.email.value
    let password = form_.password.value
    let cfpassword = form_.cfpassword.value

    let check = true

    if (!userName) {
        check = false
        setError("username_err", "Username is required")
    }
    if (!email) {
        check = false
        setError("email_err", "Email is required")
    }
    if (!password) {
        check = false
        setError("password_err", "Password is required")
    } else  {
        if (password.length < 6) {
            setError("password_err", "Password must be at least 6 characters")
            check = false
        }
        if (!cfpassword) {
            check = false
            setError("cfpassword_err", "Confirm password is required")
        } else {
            if (password !== cfpassword) {
                setError("cfpassword_err", "Confirm password is not match")
                check = false
            }
        }
    }

    if (check) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            
            // Signed in
            var user = userCredential.user;
            user.updateProfile({
              displayName: userName,
            })
            firebase.auth().currentUser.sendEmailVerification()
            // sweetAlert("success", "Sign up successfully")
            console.log(user);
    
            localStorage.setItem("currentUser", user.email)
    
            // open("./verifyemail.html")
            open("./signin.html", "_self")
            console.log("hello");
          })
          .catch((error) => {
            var errorMessage = error.message;
            sweetAlert("error", errorMessage)
          });
      }
    
}

let setError = (query, content) => {
    document.getElementById(query).innerHTML = content
}
