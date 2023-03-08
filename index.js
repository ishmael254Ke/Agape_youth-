
document.getElementById('loginb').onclick= function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    console.log(email);
    console.log(pass);

    // Sign in
    firebase.auth().signInWithEmailAndPassword(email, pass).then((userCred) => {
        let userId = userCred.user.uid;
        console.log(userId);

        //get user type
        firebase.firestore().collection('users').doc(userId).get().then((user) => {
            
                let userType = user.data().userType;

                console.log(userType);
                if (userType == 'admin') {
                    window.location.href = '/Admin/index.html';
                } else if (userType == 'staff') {
                    window.location.href = '/staff/home.html';
                }else{  //if user type is not admin or user
                    alert('User type not found');
                }
            
        })

    }).catch((error) => {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        alert(errorMessage);
    });
};