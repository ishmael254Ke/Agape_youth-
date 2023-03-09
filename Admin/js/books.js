//check if user is logged in
//also enable user to add books to the system
//Let's get started
firebase.auth().onAuthStateChanged(function (user) {
    if(user){
        //who is logged in
        let userId = user.uid;
        console.log(userId);
        //user name of the individual who's logged in
        firebase.firestore().collection('users').doc(userId).get().then(function (doc) {
            let fname = doc.data().firstName;
            let lname = doc.data().lastName;
            
            let email = doc.data().userEmail;
            let userType = doc.data().userType;
            let fullName =userType+ ' '+ fname + ' ' + lname;
            console.log(fullName);
            document.getElementById('username').innerHTML = fullName;
            document.getElementById('email').innerHTML = email;

            
        });

    }else{
        window.location.href = '/index.html';
    }
});