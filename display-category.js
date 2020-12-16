const database = firebase.firestore();
const categoryCollection = database.collection('Category')

const categoryDisplay = document.getElementById('categoryDisplay');

categoryCollection.onSnapshot(function(querySnapshot) {
    
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                if(i === 0){
                  categoryDisplay.innerHTML += "<div class ='row'>"
                }
                categoryDisplay.innerHTML += "<div class='col-lg-6' ><div class= 'card'><div class = 'card-body'><h4>" + change.doc.data().categoryName + 
                "</h4><p>" +change.doc.data().categoryShortname+"</p><p class='card-text text-muted'>" 
                +change.doc.data().categoryDescription +"</p></div></div>"
                if(i!=0 && i%2 == 0){

                    // add end of row ,and start new row on every 5 elements
                    categoryDisplay.innerHTML += '</div>'
                  }
            }

        });
        categoryDisplay.innerHTML += '</div>'
        

        
});