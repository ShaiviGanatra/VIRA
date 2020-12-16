const database = firebase.firestore();
const categoryCollection = database.collection('Category')

const categoryDisplay = document.getElementById('categoryDisplay');

categoryCollection.onSnapshot(function(querySnapshot) {
    
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change){
            if(change.type === "added"){
                  categoryDisplay.innerHTML += "<div class = 'card-body'><h4>" + change.doc.data().categoryName + 
                  "</h4><p>" +change.doc.data().categoryShortname+"</p><p class='card-text text-muted'>" 
                  +change.doc.data().categoryDescription +"</p></div>"
            }

        });
      

        
});