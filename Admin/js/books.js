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

            //add books to the system
            document.getElementById('addBook').addEventListener('click', function () {
                let bookName = document.getElementById('bookName').value;
                let bookAuthor = document.getElementById('bookAuthor').value;
                let bookCategory = document.getElementById('bookCategory').value;
                let bookDescription = document.getElementById('bookDescription').value;
                let bookStatus = document.getElementById('bookStatus').value;

                //generate a random id for the book
                function generateSerialNumber(bookTitle) {
                    const currentYear = new Date().getFullYear().toString().substr(2,4);
                    const bookPrefix = bookTitle.substr(0, 3).toUpperCase();
                    const randomNumber = Math.floor(Math.random() * 900) + 100; 
                    return `${currentYear}/${randomNumber}/Agape/${bookPrefix}`;
                  }
                  const serialNumber = generateSerialNumber(bookName);

                  let docId = firebase.firestore().collection('books').doc();
                        docId.set({ 
                                bookName: bookName,
                                bookAuthor: bookAuthor,
                                bookCategory: bookCategory,
                                bookDescription: bookDescription,
                                bookStatus: bookStatus,
                                bookSerialNumber: serialNumber,
                                docId: docId.id,
                                issued: "notTrue"

                            }).then(()=>{
                //add book to the database
                
                    console.log('Book added successfully');
                    document.getElementById('bookName').value = '';
                    document.getElementById('bookAuthor').value = '';
                    document.getElementById('bookCategory').value = '';
                    document.getElementById('bookDescription').value = '';
                    document.getElementById('bookStatus').value = '';
                }).catch(function (error) {
                    console.log(error);
                });
            });
            document.getElementById('ClosedBTN').onclick=function(){
                window.location.reload();
            };

            //get all the  books and show them using Jquery
            firebase.firestore().collection('books').get().then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    let bookSerialNumber = doc.data().bookSerialNumber;
                    let bookName = doc.data().bookName;
                    let bookAuthor = doc.data().bookAuthor;
                    let bookCategory = doc.data().bookCategory;
                    let bookDescription = doc.data().bookDescription;
                    let bookStatus = doc.data().bookStatus;
                   

                    //show the books in the table
                    $('#booksTable').append('<tr><td>'+bookSerialNumber+'</td><td>'+bookName+'</td><td>'+bookAuthor+'</td><td>'+bookCategory+'</td><td>'+bookDescription+'</td><td>'+bookStatus+'</td><td><button class="btn btn-primary" onclick="deleteBook(\''+doc.id+'\')">Delete</button></td></tr>');
                });
            });

            //delete book
            window.deleteBook = function (id) {
                firebase.firestore().collection('books').doc(id).delete().then(function () {
                    console.log('Book deleted successfully');
                    window.location.reload();
                }).catch(function (error) {
                    console.log(error);
                });
            };

            
        });

       

    }else{
        window.location.href = '/index.html';
    }
});