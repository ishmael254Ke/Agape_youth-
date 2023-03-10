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

            // if user type is admin, then show the admin panel
            if(userType == 'admin'){
                window.location.href = '/Admin/index.html';
            }else{

            
            let fullName =userType+ ' '+ fname + ' ' + lname;
            
            document.getElementById('username').innerHTML = fullName;
            document.getElementById('email').innerHTML = email;

            //get all the books from the database
            firebase.firestore().collection('books').get().then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    let book = doc.data();
                    let bookId = doc.id;
                    let bookSerialNumber = book.bookSerialNumber;
                    let bookName = book.bookName;
                    let bookAuthor = book.bookAuthor;
                    let bookCategory = book.bookCategory;
                    let bookDescription = book.bookDescription;
                   

                  //display the bookName as an option in the select tag
                  $('#bookTitle').append(`<option value="${bookName}">${bookName}</option>`);
                });
            });


            firebase.firestore().collection('books').get().then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    let bookSerialNumber = doc.data().bookSerialNumber;
                    let bookName = doc.data().bookName;
                    let bookAuthor = doc.data().bookAuthor;
                    let bookCategory = doc.data().bookCategory;
                    let bookDescription = doc.data().bookDescription;
                    let bookStatus = doc.data().bookStatus;
                    let bookId = doc.id;
                   

                    //show the books in the table
                    $('#booksTable').append('<tr><td>'+bookSerialNumber+'</td><td>'+bookName+'</td><td>'+bookAuthor+'</td><td>'+bookCategory+'</td><td>'+bookDescription+'</td><td>'+bookStatus+'</td><td><button class="btn btn-danger" onclick="onIssueBook(\''+doc.id+'\')">Issue</button></td></tr>');
                });
            });
            //function to issue book through the modal form
            window.onIssueBook = function (bookId) {
                //get the book details
                firebase.firestore().collection('books').doc(bookId).get().then(function (doc) {
                    let book = doc.data();
                    let bookName = book.bookName;
                    let bookAuthor = book.bookAuthor;
                    let bookCategory = book.bookCategory;
                    let bookDescription = book.bookDescription;
                    let bookStatus = book.bookStatus;
                    let bookSerialNumber = book.bookSerialNumber;
                    console.log(bookSerialNumber)
                    
                    //display the book details in the modal form
                   document.getElementById('bookSerialNumber').value = bookSerialNumber;
                    document.getElementById('bookName').value = bookName;
                    document.getElementById('bookAuthor').value = bookAuthor;
                    document.getElementById('bookCategory').value = bookCategory;
                    document.getElementById('bookDescription').value = bookDescription;
                    document.getElementById('bookStatus').value = bookStatus;
                    
                    //display the modal form
                    $('#staticBackdrop').modal('show');
                });
            }


            }
        });

    }else{
        window.location.href = '/index.html';
    }
});