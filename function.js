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
const trainingPDF = document.getElementById('trainingPDF');
const videoTraining = document.getElementById('videoTraining');
const workFolder = document.getElementById('workFolder');
const workWikipedia = document.getElementById('workWikipedia');
const relatedWork = document.getElementById('relatedWork');

const database = firebase.firestore();
const workCollection = database.collection('Work')

if(document.getElementById("saveDraft")){
    document.getElementById("saveDraft").addEventListener('click', e =>
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
        trainingPDF: trainingPDF.value,
        videoTraining: videoTraining.value,
        workFolder: workFolder.value,
        workWikipedia: workWikipedia.value,
        relatedWork: relatedWork.value

    })
    .then(() => {console.log('Work Inserted Succesfully');})
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
                if(i === 0){
                    document.getElementById("categoryDisplay").innerHTML += "<div class ='row'>"
                }
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

