/****************************Add Work****************************/ 

var selectCategory = document.getElementById('selectCategory');
var shortCode = document.getElementById('shortCode');
var workTitle = document.getElementById('workTitle');
var workDescription = document.getElementById('workDescription');
var longDescription = document.getElementById('longDescription');
var timeRequired = document.getElementById('timeRequired');
var skillsRequired = document.getElementById('skillsRequired');
var toolsRequired = document.getElementById('toolsRequired');
var clientQuestions = document.getElementById('clientQuestions');
// var trainingPDF = document.getElementById('trainingPDF');
var videoTraining = document.getElementById('videoTraining');
var workFolder = document.getElementById('workFolder');
var workWikipedia = document.getElementById('workWikipedia');
var relatedWork = document.getElementById('relatedWork');

var addworkform = document.querySelector("#addworkform");
var publish = document.querySelector("#publish");
var saveDraft = document.querySelector("#saveDraft");

var database = firebase.firestore();
var workCollection = database.collection('Work');

var now     = new Date(); 

if(addworkform != null){
    // let d;
    if(publish)
    {
    publish.addEventListener("click" , async(e) =>
    {
        e.preventDefault();
        if(selectCategory.value != "" && shortCode.value != "" && workTitle.value != "" && workDescription.value != ""
        && longDescription.value != "" && parseInt(timeRequired.value) != "" && skillsRequired.value != "" && toolsRequired.value != "")
        {
            workCollection.add({
                selectCategory: selectCategory.value,
                shortCode: shortCode.value,
                workTitle: workTitle.value,
                workDescription: workDescription.value,
                longDescription: longDescription.value,
                timeRequired: parseInt(timeRequired.value),
                skillsRequired: skillsRequired.value,
                toolsRequired: toolsRequired.value,
                clientQuestions: clientQuestions.value,
                // trainingPDF: trainingPDF.value,
                videoTraining: videoTraining.value,
                workFolder: workFolder.value,
                workWikipedia: workWikipedia.value,
                relatedWork: relatedWork.value,
                status: 1,
                createdAt: now
            })
            .then(() => { window.location.href = "work.html";
                console.log('Work Inserted Succesfully');
                alert('Work Inserted Succesfully');})
            .catch(error => {console.error(error)});
           if(publish != null){
                publish.disabled = false;
           }           
        }else{
            console.log("Must fill all the Mandatory (* marked) Inputs");
            alert('Must fill all the Mandatory (* marked) Inputs');
        }
    })
}
    if(saveDraft){
    saveDraft.addEventListener("click" , async(e) =>
    {
        e.preventDefault();
        if(selectCategory.value != ""  && workTitle.value != "" && workDescription.value != "")
        {

            workCollection.add({
                selectCategory: selectCategory.value,
                shortCode: shortCode.value,
                workTitle: workTitle.value,
                workDescription: workDescription.value,
                longDescription: longDescription.value,
                timeRequired: parseInt(timeRequired.value),
                skillsRequired: skillsRequired.value,
                toolsRequired: toolsRequired.value,
                clientQuestions: clientQuestions.value,
                // trainingPDF: trainingPDF.value,
                videoTraining: videoTraining.value,
                workFolder: workFolder.value,
                workWikipedia: workWikipedia.value,
                relatedWork: relatedWork.value,
                status: 2,
                createdAt: now
        
            })
            .then(() => { window.location.href = "work.html";
                console.log('Work Inserted Succesfully');
                alert('Work Inserted Succesfully');})
            .catch(error => {console.error(error)});
        
                     
        }else{
            console.log("Must fill all the Mandatory Inputs : Category, Work Title, Work Description");
            alert("Must fill all the Mandatory Inputs : Category, Work Title, Work Description")
        }
    })
}
}

/****************************Add Category****************************/

//Add Category Form
var categoryName = document.getElementById('categoryName');
var categoryShortname = document.getElementById('categoryShortname');
var categoryDescription = document.getElementById('categoryDescription');

var categoryCollection = database.collection('Category')

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

var categoryDisplay = document.getElementById('categoryDisplay');

categoryCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("categoryDisplay") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("categoryDisplay").innerHTML += "<div class='col-lg-6'><div class='card'><div class ='category-card card-body'><h4>" + change.doc.data().categoryName + 
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

/****************************Fill Select Category****************************/

var sc = document.getElementById('selectCategory');

categoryCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("selectCategory") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("selectCategory").innerHTML += "<option>" + change.doc.data().categoryName + "</option>"
            }
        });
    }    
});

/****************************Fill Work Table****************************/

// database.collection("Work").where("workTitle", "==", localStorage.getItem("workTitle"))
var workDisplay = document.getElementById('workDisplay');
workCollection.where("status", "==", 1).onSnapshot(function(querySnapshot) {
     if(document.getElementById("workDisplay") != null){
         querySnapshot.docChanges().forEach(function(change,i){
             if(change.type === "added"){
                 document.getElementById("workDisplay").innerHTML +="<tr class='custom-clickable-row'><td>"+change.doc.data().workTitle+"</td><td>"+change.doc.data().selectCategory+"</td><td>"
                 +change.doc.data().workDescription+"</td><td>"+change.doc.data().skillsRequired+"</td><td>"+change.doc.data().toolsRequired+"</td></tr>"
             }
         });
     }
 });


/****************************Store workTitle on Clicking Work Table's Row****************************/

$(document).on('click', '.custom-clickable-row', function(e){
    // var url = $(this).data('href');
    e = e || window.event;

    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("td");

        //storing workTitle to local storage
        localStorage.setItem("workTitle", cells[0].innerHTML);
    }
    
    //redirecting to add-work-edit
    window.location.href = "add-work-edit.html";
});

/****************************Loading of Add-Work-Edit****************************/

function fillAddWorkEdit() {
    database.collection("Work").where("workTitle", "==", localStorage.getItem("workTitle"))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());

            //Make all fields of form read-only
            $("#selectCategory").prop("disabled", true);
            $(".readonlytoggle").prop("readonly", true);

            //saving work id to local storage
            localStorage.setItem("workId", doc.id);

            //Filling form with data from firebase
            $("#selectCategory").val(doc.data().selectCategory);
            $("#shortCode").val(doc.data().shortCode);
            $("#workTitle").val(doc.data().workTitle);
            $("#workDescription").val(doc.data().workDescription);
            $("#longDescription").val(doc.data().longDescription);
            $("#timeRequired").val(doc.data().timeRequired);
            $("#skillsRequired").val(doc.data().skillsRequired);
            $("#toolsRequired").val(doc.data().toolsRequired);
            $("#clientQuestions").val(doc.data().clientQuestions);
            $("#videoTraining").val(doc.data().videoTraining);
            $("#workFolder").val(doc.data().workFolder);
            $("#workWikipedia").val(doc.data().workWikipedia);
            $("#relatedWork").val(doc.data().relatedWork);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

/****************************Edit Button on Add-Work-Edit****************************/

$("#editWork").on("click", function() {

    alert("Now the fields are editable");
    //Make all fields editable
    $("#selectCategory").prop("disabled", false);
    $(".readonlytoggle").prop("readonly", false);
  });

/****************************Save Changes Button on Add-Work-Edit****************************/

$("#saveChangesWork").on("click", function() {
    database.collection("Work").doc(localStorage.getItem("workId")).update({
        "selectCategory": selectCategory.value,
        "shortCode": shortCode.value,
        "workTitle": workTitle.value,
        "workDescription": workDescription.value,
        "longDescription": longDescription.value,
        "timeRequired": timeRequired.value,
        "skillsRequired": skillsRequired.value,
        "toolsRequired": toolsRequired.value,
        "clientQuestions": clientQuestions.value,
        // "trainingPDF": trainingPDF.value,
        "videoTraining": videoTraining.value,
        "workFolder": workFolder.value,
        "workWikipedia": workWikipedia.value,
        "relatedWork": relatedWork.value,
        "status": 1
    })
    .then(function() {
        window.location.href = "work.html";
        alert("Work Updated Succesfully");
        console.log("Work Updated Succesfully");
    });
});

/****************************Delete Button on Add-Work-Edit****************************/

//code to actually delete entry from firebase
// $("#deleteWork").on("click", function() {
//     database.collection("Work").doc(localStorage.getItem("workId")).delete().then(function() {
//         window.location.href = "work.html";
//         alert("Work Deleted Succesfully");
//         console.log("Work Deleted Succesfully");
//     }).catch(function(error) {
//         console.error("Error removing document: ", error);
//     });
    
// });

//code to just change status of entry in firebase
$("#deleteWork").on("click", function() {
    database.collection("Work").doc(localStorage.getItem("workId")).update({
        "status": 3
    })
    .then(function() {
        window.location.href = "work.html";
        alert("Work Deleted Succesfully");
        console.log("Work Deleted Succesfully");
    });
});

/****************************Pagination****************************/

var getWorkIdFromURL = () => {
    let workLocation = window.location.href;
    let hrefArray = workLocation.split("/");
    let workId = hrefArray.slice(-1).pop();
    
    return workId;
}

/*****************************Recently Added Ordered List**********************************/

const recentlyAdded = document.getElementById('recentlyAdded');
var query = workCollection.where("status", "==", 1).orderBy("createdAt","desc");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("recentlyAdded") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    document.createElement("createdAt").innerHTML = now;
                    document.getElementById("recentlyAdded").innerHTML += "<div class='custom-clickable-h5'><h5>"+change.doc.data().workTitle+
                    "</h5><p class='text-muted'>Created at: "+change.doc.data().createdAt.toDate()+"</p></div><hr>" 
                }
            }catch(err){}
        });
       
    }    
});

/*****************************Click on Recently Added WorkTitle**********************************/

$(document).on('click', '.custom-clickable-h5', function(e){
    // var url = $(this).data('href');
    e = e || window.event;

    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "DIV") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("h5");

        //storing workTitle to local storage
        localStorage.setItem("workTitle", cells[0].innerHTML);
    }
    
    //redirecting to add-work-edit
    window.location.href = "add-work-edit.html";
});

/*****************************Search/Filter on Work Table**********************************/

$(document).ready(function(){
    $("#searchWorkInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#workDisplay tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

/*****************************Category Click -> Fitered Work wrt Category**********************************/

$(document).on('click', '.category-card', function(e){
    // var url = $(this).data('href');
    e = e || window.event;

    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "DIV") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("h4");

        //storing workTitle to local storage
        localStorage.setItem("categoryName", cells[0].innerHTML);
    }
    
    //redirecting to work.html
    window.location.href = "work.html";

    // $("#searchWorkInput").val(localStorage.getItem("categoryName"));

});

function searchWork(){
    // alert("IM CALLED");
    
    $("#searchWorkInput").val(localStorage.getItem("categoryName"));
    $("#searchWorkInput").focus().val(localStorage.getItem("categoryName")).trigger(enterKey());
    // $("#searchWorkInput").submit()
    // jQuery.Event("keydown").key = 'Enter';
    // $("#searchWorkInput").trigger("focus");
    // document.getElementById("searchWorkInput").click();
    localStorage.removeItem("categoryName");
}

function enterKey() {

    return $.Event( "keypress", { which: 13 } );

 }