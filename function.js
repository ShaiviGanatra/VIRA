/****************************Add Work****************************/ 

const selectCategory = document.getElementById('selectCategory');
const shortCode = document.getElementById('shortCode');
const workTitle = document.getElementById('workTitle');
const workDescription = document.getElementById('workDescription');
const longDescription = document.getElementById('longDescription');
const timeRequired = document.getElementById('timeRequired');
const skillsRequired = document.getElementById('skillsRequired');
const toolsRequired = document.getElementById('toolsRequired');
const clientQuestions = document.getElementById('clientQuestions');
// const trainingPDF = document.getElementById('trainingPDF');
const videoTraining = document.getElementById('videoTraining');
const workFolder = document.getElementById('workFolder');
const workWikipedia = document.getElementById('workWikipedia');
const relatedWork = document.getElementById('relatedWork');

const database = firebase.firestore();
const workCollection = database.collection('Work')

if(document.getElementById("publish")){
    document.getElementById("publish").addEventListener('click', e =>
{
    e.preventDefault();
    workCollection.add({
        selectCategory: selectCategory.value,
        shortCode: shortCode.value,
        workTitle: workTitle.value,
        workDescription: workDescription.value,
        longDescription: longDescription.value,
        timeRequired: timeRequired.value,
        skillsRequired: skillsRequired.value,
        toolsRequired: toolsRequired.value,
        clientQuestions: clientQuestions.value,
        // trainingPDF: trainingPDF.value,
        videoTraining: videoTraining.value,
        workFolder: workFolder.value,
        workWikipedia: workWikipedia.value,
        relatedWork: relatedWork.value

    })
    .then(() => { window.location.href = "work.html";
        console.log('Work Inserted Succesfully');})
    .catch(error => {console.error(error)});
});
}

/****************************Add Category****************************/

//Add Category Form
const categoryName = document.getElementById('categoryName');
const categoryShortname = document.getElementById('categoryShortname');
const categoryDescription = document.getElementById('categoryDescription');

const categoryCollection = database.collection('Category')

//Add Category Function
if(document.getElementById("submitCategory")){
    document.getElementById("submitCategory").addEventListener('click', e =>
{
    e.preventDefault();
    categoryCollection.add({
        categoryName: categoryName.value,
        categoryShortname: categoryShortname.value,
        categoryDescription: categoryDescription.value
    })
    .then(() => { window.location.href = "category.html";
        console.log('Category Inserted Succesfully');})
    .catch(error => {console.error(error)});
});

}

/****************************Display Category****************************/

const categoryDisplay = document.getElementById('categoryDisplay');

categoryCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("categoryDisplay") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("categoryDisplay").innerHTML += "<div class='col-lg-6'><div class='card'><div class ='card-body'><h4>" + change.doc.data().categoryName + 
                "</h4><p>" +change.doc.data().categoryShortname+"</p><p class='card-text text-muted'>" 
                +change.doc.data().categoryDescription +"</p></div></div>"
                if(i!=0 && i%2 == 0){

                    // add end of row ,and start new row on every 2 elements
                    document.getElementById("categoryDisplay").innerHTML += '</div>'
                  }
            }
        });
        document.getElementById("categoryDisplay").innerHTML += '</div>'
    }    
});

/****************************Display Work****************************/

const workDisplay = document.getElementById('workDisplay');

workCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("workDisplay") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("workDisplay").innerHTML += "<div class='col-lg-6'><div class='card'><div class ='card-body'><h4>" + change.doc.data().workTitle + 
                "</h4><p>" +change.doc.data().workDescription+"</p><p class='card-text text-muted'>" 
                +change.doc.data().longDescription +"</p></div></div>"
                if(i!=0 && i%2 == 0){

                    // add end of row ,and start new row on every 2 elements
                    document.getElementById("workDisplay").innerHTML += '</div>'
                  }
            }
        });
        document.getElementById("workDisplay").innerHTML += '</div>'
    }    
});
/****************************Detailed Work-card****************************/
const cardselectCategory = document.getElementById('cardselectCategory');

workCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("cardselectCategory") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardselectCategory").innerHTML += change.doc.data().selectCategory
                
            }
        });
        //document.getElementById("cardselectCategory").innerHTML += '</div>'
    }    
    if(document.getElementById("cardshortCode") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardshortCode").innerHTML += change.doc.data().shortCode
                
            }
        });
       
    }   
    if(document.getElementById("cardworkTitle") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardworkTitle").innerHTML += change.doc.data().workTitle
                
            }
        });
    } 
    if(document.getElementById("cardworkDescription") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardworkDescription").innerHTML += change.doc.data().workDescription
                
            }
        });
    } 
    if(document.getElementById("cardlongDescription") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardlongDescription").innerHTML += change.doc.data().longDescription
                
            }
        });
    } 
    if(document.getElementById("cardTimeRequired") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardTimeRequired").innerHTML += change.doc.data().timeRequired
                
            }
        });
    }
    if(document.getElementById("cardskillsRequired") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardskillsRequired").innerHTML += change.doc.data().skillsRequired
                
            }
        });
    }
    if(document.getElementById("cardtoolsRequired") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardtoolsRequired").innerHTML += change.doc.data().toolsRequired
                
            }
        });
    }
    if(document.getElementById("cardclientQuestion") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardclientQuestion").innerHTML += change.doc.data().clientQuestions
                
            }
        });
    }
    if(document.getElementById("cardvideoTraining") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardvideoTraining").innerHTML += change.doc.data().videoTraining
            }
        });
    }
    if(document.getElementById("cardworkFolder") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardworkFolder").innerHTML += change.doc.data().workFolder
            }
        });
    }
    if(document.getElementById("cardworkWikipedia") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardworkWikipedia").innerHTML += change.doc.data().workWikipedia
            }
        });
    }
    if(document.getElementById("cardrelatedWork") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("cardrelatedWork").innerHTML += change.doc.data().relatedWork
            }
        });
    }
});
