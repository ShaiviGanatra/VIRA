
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

var assignedTo = document.getElementById('assignedTo');
var points = document.getElementById('points');
var cWorkStatus = document.getElementById('cWorkStatus');
var addworkform = document.querySelector("#addworkform");
var publish = document.querySelector("#publish");
var saveDraft = document.querySelector("#saveDraft");

var database = firebase.firestore();
var workCollection = database.collection('Work');
var userCollection = database.collection('Users');
//var personCollection = database.collection('Persons');
var clientsCollection = database.collection('Clients');
var workAssignedCol = database.collection('workAssigned');
var interestCollection = database.collection('Interested');

var now     = new Date(); 

if(addworkform != null){
    if(publish)
    {
    publish.addEventListener("click" , async(e) =>
    {
        e.preventDefault();
        if(selectCategory.value != "" && shortCode.value != "" && workTitle.value != "" && workDescription.value != ""
        && longDescription.value != "" && parseFloat(timeRequired.value) != "" && skillsRequired.value != "" && toolsRequired.value != "")
        {
            
            workCollection.add({
                selectCategory: selectCategory.value,
                shortCode: shortCode.value,
                workTitle: workTitle.value,
                workDescription: workDescription.value,
                longDescription: longDescription.value,
                timeRequired: parseFloat(timeRequired.value),
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
            .then(() => {// window.location.href = "work.html";
                console.log('Work Inserted Succesfully');
                alert('Work Inserted Succesfully');
            })
            .catch(error => {console.error(error)});
            if(assignedTo.value !== null && assignedTo.value !== '' &&  assignedTo.value !== "Select User" && points.value !="") 
            {
                workAssignedCol.add({
                    selectCategory: selectCategory.value,
                    shortCode: shortCode.value,
                    workTitle: workTitle.value,
                    workDescription: workDescription.value,
                    longDescription: longDescription.value,
                    timeRequired: parseFloat(timeRequired.value),
                    skillsRequired: skillsRequired.value,
                    toolsRequired: toolsRequired.value,
                    clientQuestions: clientQuestions.value,
                    // trainingPDF: trainingPDF.value,
                    videoTraining: videoTraining.value,
                    workFolder: workFolder.value,
                    workWikipedia: workWikipedia.value,
                    assignedTo : assignedTo.value,
                    points : points.value,
                    relatedWork: relatedWork.value,
                    status : 5,
                    Completestatus: "Assigned",
                    AssignedAt: now
                })
                
                .then(() => {// window.location.href = "work.html";
                console.log('Work Assigned Succesfully');
                alert('Work Assigned Succesfully');})
            .catch(error => {console.error(error)});
            }     
           if(publish != null){
                publish.disabled = false;
           }
                
        }
        
        else{
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
                timeRequired: parseFloat(timeRequired.value),
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
    .then(() => { window.location.href = "directory.html";
        alert("Category Inserted Succesfully");
        console.log('Category Inserted Succesfully');
        // window.location.href = "add-category.html";

    })
    .catch(error => {console.error(error)});
});

}

/****************************Manager Display Category****************************/

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
/****************************CRM Display Category****************************/

var CRMcategoryDisplay = document.getElementById('CRMcategoryDisplay');

categoryCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMcategoryDisplay") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("CRMcategoryDisplay").innerHTML += "<div class='col-lg-6'><div class='card'><div class ='category-cardCRM card-body'><h4>" + change.doc.data().categoryName + 
                "</h4><p>" +change.doc.data().categoryShortname+"</p><p class='card-text text-muted'>" 
                +change.doc.data().categoryDescription +"</p></div></div>"
                if(i!=0 && i%2 == 0){

                    // add end of row ,and start new row on every 2 elements
                    document.getElementById("CRMcategoryDisplay").innerHTML += '</div>'
                  }
            }
        });
        document.getElementById("CRMcategoryDisplay").innerHTML += '</div>'
    }    
});
/****************************VI Display Category****************************/

var VIcategoryDisplay = document.getElementById('VIcategoryDisplay');

categoryCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("VIcategoryDisplay") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("VIcategoryDisplay").innerHTML += "<div class='col-lg-6'><div class='card'><div class ='category-cardVI card-body'><h4>" + change.doc.data().categoryName + 
                "</h4><p>" +change.doc.data().categoryShortname+"</p><p class='card-text text-muted'>" 
                +change.doc.data().categoryDescription +"</p></div></div>"
                if(i!=0 && i%2 == 0){

                    // add end of row ,and start new row on every 2 elements
                    document.getElementById("VIcategoryDisplay").innerHTML += '</div>'
                  }
            }
        });
        document.getElementById("VIcategoryDisplay").innerHTML += '</div>'
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



/****************************Manager Fill Work Table****************************/

// database.collection("Work").where("workTitle", "==", localStorage.getItem("workTitle"))
// var workDisplay = document.getElementById('workDisplay');
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



/****************************(Manager)Store workTitle on Clicking Work Table's Row****************************/

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




/****************************CRM Fill Work Table****************************/

// database.collection("Work").where("workTitle", "==", localStorage.getItem("workTitle"))
// var workDisplay = document.getElementById('workDisplay');
workCollection.where("status", "==", 1).onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMworkDisplay") != null){
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("CRMworkDisplay").innerHTML +="<tr class='custom-clickable-rowCRMworkDisplay'><td>"+change.doc.data().workTitle+"</td><td>"+change.doc.data().selectCategory+"</td><td>"
                +change.doc.data().workDescription+"</td><td>"+change.doc.data().skillsRequired+"</td><td>"+change.doc.data().toolsRequired+"</td></tr>"
            }
        });
    }
});
/****************************VI Fill Work Table****************************/

// database.collection("Work").where("workTitle", "==", localStorage.getItem("workTitle"))
// var workDisplay = document.getElementById('workDisplay');
workCollection.where("status", "==", 1).onSnapshot(function(querySnapshot) {
    if(document.getElementById("VIworkDisplay") != null){
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("VIworkDisplay").innerHTML +="<tr class='custom-clickable-rowVIworkDisplay'><td>"+change.doc.data().workTitle+"</td><td>"+change.doc.data().selectCategory+"</td><td>"
                +change.doc.data().workDescription+"</td><td>"+change.doc.data().skillsRequired+"</td><td>"+change.doc.data().toolsRequired+"</td></tr>"
            }
        });
    }
});




/****************************(CRM)Store workTitle on Clicking Work Table's Row****************************/

$(document).on('click', '.custom-clickable-rowCRMworkDisplay', function(e){
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
   window.location.href = "CRM-workavailable.html";
});

/****************************(VI)Store workTitle on Clicking Work Table's Row****************************/

$(document).on('click', '.custom-clickable-rowVIworkDisplay', function(e){
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
    window.location.href = "VI-view-work.html";
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
            $("#assignedTo").prop("disabled", true);
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
    database.collection("workAssigned").where("workTitle", "==", localStorage.getItem("workTitle"))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            localStorage.setItem("workAssignedId", doc.id);
            //Make all fields of form read-only
            $("#selectCategory").prop("disabled", true);
            $(".readonlytoggle").prop("readonly", true);
            $("#assigendTo").prop("disabled", true);
            $(".readonlytoggle").prop("readonly", true);

            $("#assignedTo").val(doc.data().assignedTo);
            $("#points").val(doc.data().points);
            $("#cWorkStatus").val(doc.data().Completestatus);
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
    $("#assignedTo").prop("disabled", false);
    $(".readonlytoggle").prop("readonly", false);
  });

/****************************Save Changes Button on Add-Work-Edit****************************/

$("#saveChangesWork").on("click", function() {
    if(confirm("Save Work ?")){
    database.collection("Work").doc(localStorage.getItem("workId")).update({
        "selectCategory": selectCategory.value,
        "shortCode": shortCode.value,
        "workTitle": workTitle.value,
        "workDescription": workDescription.value,
        "longDescription": longDescription.value,
        "timeRequired": parseFloat(timeRequired.value),
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
        // window.location.href = "work.html";
         alert("Work Updated Succesfully");
         console.log("Work Updated Succesfully");
     }); 
    if(assignedTo != "" && points.value !="") 
    {
    database.collection("workAssigned").add({
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
        "assignedTo" : assignedTo.value,
        "points" : points.value,
        "status": 5,
        "Completestatus": "Assigned",
        "AssignedAt": now
        
    }).then(function() {
        database.collection("Work").doc(localStorage.getItem("workId")).update({
            "status":5
        })
       // window.location.href = "work.html";
        alert("Work Assigned Succesfully");
        console.log("Work Assigned Succesfully");
        // window.location.href = "CRM-broadcast.html"
    });
}
    }
    else{
        // window.location.href = "CRM-workavailable.html"
    } 
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
    if(confirm("Delete Work ?")){
    database.collection("Work").doc(localStorage.getItem("workId")).update({
        "status": 3
    })
    .then(function() {
       // window.location.href = "work.html";
        alert("Work Deleted Succesfully");
        console.log("Work Deleted Succesfully");
        window.location.href = "CRM-broadcast.html";

    });
}else{
    window.location.href = "CRM-workavailable.html";
}
});

/****************************Pagination****************************/

var getWorkIdFromURL = () => {
    let workLocation = window.location.href;
    let hrefArray = workLocation.split("/");
    let workId = hrefArray.slice(-1).pop();
    
    return workId;
}

/*****************************Manager Recently Added on Dashboard**********************************/

// var recentlyAdded = document.getElementById('recentlyAdded');
var query = workCollection.where("status", "==", 1).orderBy("createdAt","desc");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("recentlyAdded") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    document.createElement("createdAt").innerHTML = now;
                    document.getElementById("recentlyAdded").innerHTML += "<div class='custom-clickable-h5recently'><h5>"+change.doc.data().workTitle+
                    "</h5><p class='text-muted'>Created at: "+change.doc.data().createdAt.toDate()+"</p></div><hr>" 
                }
            }catch(err){}
        });
    }    
});

/*****************************Manager Click on Recently Added WorkTitle**********************************/

$(document).on('click', '.custom-clickable-h5recently', function(e){
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

/*****************************CRM Recently Added on Dashboard**********************************/

// var recentlyAdded = document.getElementById('recentlyAdded');
var query = workCollection.where("status", "==", 1).orderBy("createdAt","desc");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMrecentlyAdded") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    document.createElement("createdAt").innerHTML = now;
                    document.getElementById("CRMrecentlyAdded").innerHTML += "<div class='custom-clickable-h5recentlyCRM'><h5>"+change.doc.data().workTitle+
                    "</h5><p class='text-muted'>Created at: "+change.doc.data().createdAt.toDate()+"</p></div><hr>" 
                }
            }catch(err){}
        });
    }    
});

/*****************************Manager Click on Recently Added WorkTitle**********************************/

$(document).on('click', '.custom-clickable-h5recentlyCRM', function(e){
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
    window.location.href = "CRM-workavailable.html";
});


/*****************************Manager Search/Filter on Work Table**********************************/

$(document).ready(function(){
    $("#searchWorkInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#workDisplay tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
  $(document).ready(function(){
    $("#searchWorkInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#mylistworkDisplay tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
/*****************************CRM Search/Filter on Work Table**********************************/

$(document).ready(function(){
    $("#searchWorkInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#CRMworkDisplay tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
  $(document).ready(function(){
    $("#searchWorkInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#CRMmylistworkDisplay tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
/*****************************VI Search/Filter on Work Table**********************************/

$(document).ready(function(){
    $("#searchWorkInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#VIworkDisplay tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

/*****************************Manager Search/Filter on Work Category**********************************/

$(document).ready(function(){
    $("#searchWorkInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#categoryDisplay div").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

/*****************************Manager Search/Filter on Work Category**********************************/

$(document).ready(function(){
    $("#searchWorkInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#CRMcategoryDisplay div").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });  

/*****************************Manager Category Click -> Fitered Work wrt Category**********************************/

$(document).on('click', '.category-card', function(e){
    
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

});

/*****************************CRM Category Click -> Fitered Work wrt Category**********************************/

$(document).on('click', '.category-cardCRM', function(e){
    
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
    window.location.href = "CRM-work.html";

});
/*****************************CRM Category Click -> Fitered Work wrt Category**********************************/

$(document).on('click', '.category-cardVI', function(e){
    
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
    window.location.href = "VI-work.html";

});

/*****************************Search Work Function on Work**********************************/

function searchWork(){
    $("#searchWorkInput").val(localStorage.getItem("categoryName"));
    // $("#searchWorkInput").focus().val(localStorage.getItem("categoryName")).trigger(enterKey());
    localStorage.removeItem("categoryName");
}

/****************************Manager Fill My List Table****************************/

// database.collection("Work").where("workTitle", "==", localStorage.getItem("workTitle"))
// var mylistworkDisplay = document.getElementById('workDisplay');
workCollection.where("status", "==", 2).onSnapshot(function(querySnapshot) {
     if(document.getElementById("mylistworkDisplay") != null){
         querySnapshot.docChanges().forEach(function(change,i){
             if(change.type === "added"){
                 document.getElementById("mylistworkDisplay").innerHTML +="<tr class='custom-clickable-row'><td>"+change.doc.data().workTitle+"</td><td>"+change.doc.data().selectCategory+"</td><td>"
                 +change.doc.data().workDescription+"</td><td>"+change.doc.data().skillsRequired+"</td><td>"+change.doc.data().toolsRequired+"</td></tr>"
             }
         });
     }
 });

 /****************************CRM Fill My List Table****************************/

// database.collection("Work").where("workTitle", "==", localStorage.getItem("workTitle"))
// var mylistworkDisplay = document.getElementById('workDisplay');
workCollection.where("status", "==", 2).onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMmylistworkDisplay") != null){
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("CRMmylistworkDisplay").innerHTML +="<tr class='custom-clickable-rowCRMmylistworkDisplay'><td>"+change.doc.data().workTitle+"</td><td>"+change.doc.data().selectCategory+"</td><td>"
                +change.doc.data().workDescription+"</td><td>"+change.doc.data().skillsRequired+"</td><td>"+change.doc.data().toolsRequired+"</td></tr>"
            }
        });
    }
});
/****************************(CRM)Store workTitle on Clicking Work Table's Row****************************/

$(document).on('click', '.custom-clickable-rowCRMmylistworkDisplay', function(e){
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
    window.location.href = "CRM-workavailable.html";
});




/*****************************Search/Filter on My List Table**********************************/

$(document).ready(function(){
    $("#searchWorkInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#mylistworkDisplay tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

/*****************************Manager My List on Dashboard**********************************/

// var recentlyAdded = document.getElementById('recentlyAdded');
query = workCollection.where("status", "==", 2).orderBy("createdAt","desc");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("mylistdashboard") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    document.createElement("createdAt").innerHTML = now;
                    document.getElementById("mylistdashboard").innerHTML += "<div class='custom-clickable-h5mylist'><h5>"+change.doc.data().workTitle+
                    "</h5><p class='text-muted'>Created at: "+change.doc.data().createdAt.toDate()+"</p></div><hr>" 
                }
            }catch(err){}
        });
    }    
});
/*****************************Manager Click on mylist WorkTitle**********************************/

$(document).on('click', '.custom-clickable-h5mylist', function(e){
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

/*****************************CRMMy List on Dashboard**********************************/

// var recentlyAdded = document.getElementById('recentlyAdded');
query = workCollection.where("status", "==", 2).orderBy("createdAt","desc");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMmylistdashboard") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    document.createElement("createdAt").innerHTML = now;
                    document.getElementById("CRMmylistdashboard").innerHTML += "<div class='custom-clickable-h5CRMmylist'><h5>"+change.doc.data().workTitle+
                    "</h5><p class='text-muted'>Created at: "+change.doc.data().createdAt.toDate()+"</p></div><hr>" 
                }
            }catch(err){}
        });
    }    
});

/*****************************CRM Click on mylist WorkTitle**********************************/

$(document).on('click', '.custom-clickable-h5CRMmylist', function(e){
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
    window.location.href = "CRM-workavailable.html";
});

/*******************************Login Credentials*************************************************/

//listen for auth status changes

firebase.auth().onAuthStateChanged(user => {
    if(user)
    {
        //window.alert("Logged In Successfully !");
        setupUI(user)
        console.log('User logged in: ',user)
    }
    else
    {
        console.log('User logged out: ',user)
    }
       
  });
  

  
//function login(){

const loginForm = document.querySelector('#loginf');
if(document.getElementById("loginf"))
{
loginForm.addEventListener('click',(e)=>{
    e.preventDefault();
    var email = document.getElementById('email_field').value;
    var password = document.getElementById('password_field').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(cred =>{
        
        console.log(cred.user)
        var user = firebase.auth().currentUser;
        
        userCollection.doc(user.uid).get().then(doc => {
            
            if(doc.data().userRole == "CRM")
            {
                window.location.href = "CRM-dashboard.html";
            }
            else if(doc.data().userRole == "VI")
            {
                window.location.href = "VI-dashboard.html";
            }
            else if(doc.data().userRole == "External-VI")
            {
                window.location.href = "VI-dashboard.html";
            }
            else{
                window.location.href = "dashboard.html"; 
            }
            });
            
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        window.alert("Error : "+errorCode+" "+errorMessage);
      })
})
}
    
//}
const userDetails = document.querySelector('.custom-modal-text');
const setupUI =(user) =>{
    if(user){
        userCollection.doc(user.uid).get().then(doc => {
            
        const html = `
            <div>Logged in as ${user.email}</div>
            <div> ${doc.data().userRole}</div>
        `;

        userDetails.innerHTML = html;
        
            var query = workAssignedCol.orderBy("AssignedAt","desc");
            query.onSnapshot(function(querySnapshot) {
                    if(document.getElementById("forMe") != null){
                    // doc.data() is never undefined for query doc snapshots
                    querySnapshot.docChanges().forEach(function(change,i){
                        /***************************Display in For me Section***********************************************/
                        if(doc.data().name == change.doc.data().assignedTo)
                        {
                            if(doc.data().userRole == "External-VI"){
                                try{
                                    if(change.type === "added"){
                                        if(change.doc.data().Completestatus != "Rejected"){
                                        document.createElement("AssignedAt").innerHTML = now;
                                        document.getElementById("forMe").innerHTML += "<div class='custom-clickable-EVIforMe'><h5>"+change.doc.data().workTitle+
                                        "</h5><p class='text-muted'>Assigned at: "+change.doc.data().AssignedAt.toDate()+"</p></div><hr>" 
                                    }
                                }
                                }catch(err){}  
                            }else{
                                try{
                                    if(change.type === "added"){
                                        if(change.doc.data().Completestatus != "Done"){
                                        document.createElement("AssignedAt").innerHTML = now;
                                        document.getElementById("forMe").innerHTML += "<div class='custom-clickable-forMe'><h5>"+change.doc.data().workTitle+
                                        "</h5><p class='text-muted'>Assigned at: "+change.doc.data().AssignedAt.toDate()+"</p></div><hr>" 
                                    }
                                }
                                }catch(err){}
                            }
                        }
                    });
                } 
                if(document.getElementById("assignedWork") != null){
                    // doc.data() is never undefined for query doc snapshots
                    querySnapshot.docChanges().forEach(function(change,i){
                        /***************************Display in For me Section***********************************************/
                        if(doc.data().name == change.doc.data().assignedTo)
                        {
                            if(doc.data().userRole == "VI"){
                                try{
                                    if(change.type === "added"){
                                        if(change.doc.data().Completestatus == "Assigned"){
                                        document.createElement("AssignedAt").innerHTML = now;
                                        document.getElementById("assignedWork").innerHTML += "<div class='custom-clickable-forMe'><h5>"+change.doc.data().workTitle+
                                        "</h5><p class='text-muted'>Assigned at: "+change.doc.data().AssignedAt.toDate()+"</p></div><hr>" 
                                    }
                                }
                                }catch(err){}  
                            }else{
                                try{
                                    if(change.type === "added"){
                                        if(change.doc.data().Completestatus == "Assigned"){
                                        document.createElement("AssignedAt").innerHTML = now;
                                        document.getElementById("assignedWork").innerHTML += "<div class='custom-clickable-EVIforMe'><h5>"+change.doc.data().workTitle+
                                        "</h5><p class='text-muted'>Assigned at: "+change.doc.data().AssignedAt.toDate()+"</p></div><hr>" 
                                    }
                                }
                                }catch(err){}
                            }
                        }
                    });
                } 
                if(document.getElementById("inProgressWork") != null){
                    // doc.data() is never undefined for query doc snapshots
                    querySnapshot.docChanges().forEach(function(change,i){
                        /***************************Display in For me Section***********************************************/
                        if(doc.data().name == change.doc.data().assignedTo)
                        {
                            if(doc.data().userRole == "VI"){
                                try{
                                    if(change.type === "added"){
                                        if(change.doc.data().Completestatus == "In Progress"){
                                        document.createElement("AssignedAt").innerHTML = now;
                                        document.getElementById("inProgressWork").innerHTML += "<div class='custom-clickable-forMe'><h5>"+change.doc.data().workTitle+
                                        "</h5><p class='text-muted'>Assigned at: "+change.doc.data().AssignedAt.toDate()+"</p></div><hr>" 
                                    }
                                }
                                }catch(err){}  
                            }else{
                                try{
                                    if(change.type === "added"){
                                        if(change.doc.data().Completestatus == "In Progress"){
                                        document.createElement("AssignedAt").innerHTML = now;
                                        document.getElementById("inProgressWork").innerHTML += "<div class='custom-clickable-EVIforMe'><h5>"+change.doc.data().workTitle+
                                        "</h5><p class='text-muted'>Assigned at: "+change.doc.data().AssignedAt.toDate()+"</p></div><hr>" 
                                    }
                                }
                                }catch(err){}
                            }
                        }
                    });
                } 
                if(document.getElementById("completedWork") != null){
                    // doc.data() is never undefined for query doc snapshots
                    querySnapshot.docChanges().forEach(function(change,i){
                        /***************************Display in For me Section***********************************************/
                        if(doc.data().name == change.doc.data().assignedTo)
                        {
                            if(doc.data().userRole == "VI"){
                                try{
                                    if(change.type === "added"){
                                        if(change.doc.data().Completestatus == "Completed"){
                                        document.createElement("AssignedAt").innerHTML = now;
                                        document.getElementById("completedWork").innerHTML += "<div class='custom-clickable-forMe'><h5>"+change.doc.data().workTitle+
                                        "</h5><p class='text-muted'>Assigned at: "+change.doc.data().AssignedAt.toDate()+"</p></div><hr>" 
                                    }
                                }
                                }catch(err){}  
                            }else{
                                try{
                                    if(change.type === "added"){
                                        if(change.doc.data().Completestatus == "Completed"){
                                        document.createElement("AssignedAt").innerHTML = now;
                                        document.getElementById("completedWork").innerHTML += "<div class='custom-clickable-EVIforMe'><h5>"+change.doc.data().workTitle+
                                        "</h5><p class='text-muted'>Assigned at: "+change.doc.data().AssignedAt.toDate()+"</p></div><hr>" 
                                    }
                                }
                                }catch(err){}
                            }
                        }
                    });
                } 
  /*              
                    querySnapshot.docChanges().forEach(function(change,i){
                        //if(change.doc.data().Completestatus == "Done"){
                            
                        var WorkDone = document.querySelector("#workDone");
                        var Completestatus = document.getElementById('cWorkStatus');
                        if(WorkDone)
                        {
                            
                        $("#workDone").on("click", function() {
                            if(Completestatus.value == "Completed"){
                            if(confirm("Are you sure the work is done ?")){
                            database.collection("workAssigned").doc(localStorage.getItem("workAssignedId")).update({
                                "status": 6,//Work done
                                "Completestatus" : "Done"
                            })
                            .then(function() {
                               // alert(database.collection('Users').doc('RnhKOp2N8VfoJJUSxcgyKykuc6T2').get().then((doc) => { doc.data.toString()}));
                                alert("Work Done Succesfully");
                                console.log("Work Done Succesfully");
                                window.location.href = "CRM-dashboard.html";
                                // if(doc.data().name == change.doc.data().assignedTo)
                                // {
                                //alert("haha");
                                // var tasksCompleted , hrsWork , Karma;
                                // tasksCompleted +=  doc.data().taskscompleted + 1; 
                                // hrsWork += doc.data().hrswork + timeRequired.value;
                                // Karma += doc.data().karma + change.doc.data().points;
                                // alert(tasksCompleted);
                                // alert(timeRequired.value);
                                // alert(Karma);
                                //hrsWork += timeRequired.value;
                                //Karma += points.value;
                                
                                // database.collection("Users").doc(localStorage.getItem("userId")).update({
                                //     taskscompleted : 1,
                                //     hrswork : 1,
                                //     karma : 1
                                    
                                //     // taskscompleted : taskscompleted+1,
                                //     // hrswork : hrswork+timeRequired.value,
                                //     // karma : karma+points.value
                                    
                                // }).catch(error => {
                                //     alert(error);
                                //     console.log(error)});
                               // }
                            });
                        }
                        else{
                            window.location.href = "CRM-done-form.html";
                        }
                            }
                            else{
                                    alert("The Work should be completed");
                                    console.log("The Work should be completed"); 
                                } 
                        });  


                      
                    }
                //}
            });
*/
                
                
            })
            
            var Interestedbtn = document.querySelector("#Interestedbtn");
            if(Interestedbtn)
            {
                
                $("#Interestedbtn").on("click", function() {
                    if(confirm("Are you sure you are interested to do the work ?")){
                    database.collection("Work").doc(localStorage.getItem("workId")).update({
                        "status": 4
                    })
                    workAssignedCol.add({
                        name : doc.data().name,
                        selectCategory: selectCategory.value,
                        shortCode: shortCode.value,
                        workTitle: workTitle.value,
                        workDescription: workDescription.value,
                        longDescription: longDescription.value,
                        timeRequired: parseFloat(timeRequired.value),
                        skillsRequired: skillsRequired.value,
                        toolsRequired: toolsRequired.value,
                        clientQuestions: clientQuestions.value,
                        // trainingPDF: trainingPDF.value,
                        videoTraining: videoTraining.value,
                        workFolder: workFolder.value,
                        workWikipedia: workWikipedia.value,
                        assignedTo : assignedTo.value,
                        points : points.value,
                        relatedWork: relatedWork.value,
                        status : 4,
                        Completestatus: "Interested",
                        InterestedAt: now
                    })
                    .then(function() {
                        window.location.href = "VI-broadcast.html";
                        alert("CRM will be notified about your Interest");
                        console.log("CRM will be notified about your Interest");
                    });
                }else{
                    window.location.href = "VI-workavailable.html";
                }
                });
            }
                    
        })
    }
}

//logout
function logout(){
    firebase.auth().signOut().then(() => {
       // window.alert("User Logged Out Successfully !");
        window.location.href = "index.html";
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
   
}

/*********************************Add User form**************************************/
const userForm = document.querySelector('#saveUserForm');
if(document.getElementById("saveUserForm"))
{
    userForm.addEventListener('click',(e)=>{
    e.preventDefault();

    //get user info

    const useremail = document.getElementById('useremail').value;
    const pswd = document.getElementById('choosePassword').value;
    var userskillset = document.getElementById('skillset').value;
    
    //var newskillId = document.getElementById('newInputBox').value;
    // var array = [];
    // for(var i=0; i<4; i++)  {
    //     array.push(newskillId);
    // }

    //create the user
 
    secondaryApp.auth().createUserWithEmailAndPassword(useremail , pswd).then(cred => {
        return database.collection('Users').doc(cred.user.uid).set({
            useremail : document.getElementById('useremail').value,
            name : document.getElementById('name').value,
            // lastname : document.getElementById('lname').value,
            userSkillarr : firebase.firestore.FieldValue.arrayUnion(...[userskillset]),
            userRole : document.getElementById('userRole').value,
            taskscompleted : 0,
            hrswork : 0,
            taskspending :0,
            karma : 0,
            earned :0

       });
       
    })
    window.alert("User Created Successfully !")
    window.location.href = "add-user.html";
});
}

/*********************************Add Client Details**************************************/
var cfname = document.getElementById('cfname');
var clname = document.getElementById('clname');
var cemail = document.getElementById('cemail');
var cmobilenum = document.getElementById('cmobilenum');
var corganization = document.getElementById('corganization');
var cdepartment = document.getElementById('cdepartment');
var corganizationweb = document.getElementById('corganizationweb');
var caddress = document.getElementById('caddress');
var caddinfo = document.getElementById('caddinfo');

//Add Category Function
if(document.getElementById("saveClientForm")){
    document.getElementById("saveClientForm").addEventListener('click', e =>
    {
        if(cfname.value != "" && clname.value != "" && cemail.value != "" && cmobilenum.value != "" && corganization.value != "" && cdepartment.value != "" && caddress.value != ""){
    e.preventDefault();
    clientsCollection.add({
        cfname: cfname.value,
        clname: clname.value,
        cemail: cemail.value,
        cmobilenum: cmobilenum.value,
        corganization: corganization.value,
        cdepartment: cdepartment.value,
        corganizationweb: corganizationweb.value,
        caddress: caddress.value,
        caddinfo: caddinfo.value
    })
    .then(() => { window.location.href = "add-client.html";
        window.alert('Client Added Succesfully !');
        window.location.href = "add-client.html";

    })
    .catch(error => {console.error(error)});
    }
    else{
        console.log("Must fill all the Mandatory (* marked) Inputs");
        alert('Must fill all the Mandatory (* marked) Inputs');
    }

});
}


/****************************CRM Fill Client Table****************************/

clientsCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMclientDisplay") != null){
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("CRMclientDisplay").innerHTML +="<tr class='custom-clickable-row-tdCRM'><td>"+change.doc.data().cfname+"</td><td>"+change.doc.data().clname+"</td><td>"
                +change.doc.data().cemail+"</td><td>"+change.doc.data().corganization+"</td><td>"+change.doc.data().cdepartment+"</td></tr>"
                
            }
        });
    }
});


/****************************CRM Store Client fname on Clicking Client Table's Row****************************/

$(document).on('click', '.custom-clickable-row-tdCRM', function(e){
    // var url = $(this).data('href');
    e = e || window.event;

    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("td");

        //storing workTitle to local storage
        localStorage.setItem("cfname", cells[0].innerHTML);
        //alert(cells[0].innerHTML)
    }
    
    //redirecting to add-work-edit
    window.location.href = "CRM-view-client-form.html";
});

/****************************Manager Fill Client Table****************************/

clientsCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("clientDisplay") != null){
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                document.getElementById("clientDisplay").innerHTML +="<tr class='custom-clickable-row-tdManager'><td>"+change.doc.data().cfname+"</td><td>"+change.doc.data().clname+"</td><td>"
                +change.doc.data().cemail+"</td><td>"+change.doc.data().corganization+"</td><td>"+change.doc.data().cdepartment+"</td></tr>"
                
            }
        });
    }
});


/****************************CRM Store Client fname on Clicking Client Table's Row****************************/

$(document).on('click', '.custom-clickable-row-tdManager', function(e){
    // var url = $(this).data('href');
    e = e || window.event;

    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("td");

        //storing workTitle to local storage
        localStorage.setItem("cfname", cells[0].innerHTML);
        //alert(cells[0].innerHTML)
    }
    
    //redirecting to add-work-edit
    window.location.href = "view-client-form.html";
});


/****************************Loading of Client Add-Work-Edit****************************/

function fillviewClient() {
    database.collection("Clients").where("cfname", "==", localStorage.getItem("cfname"))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());

            //Make all fields of form read-only
            $(".readonlytoggle").prop("readonly", true);
            //saving work id to local storage
            localStorage.setItem("ClientId", doc.id);

            //Filling form with data from firebase
            $("#cfname").val(doc.data().cfname);
            $("#clname").val(doc.data().clname);
            $("#cemail").val(doc.data().cemail);
            $("#cmobilenum").val(doc.data().cmobilenum);
            $("#corganization").val(doc.data().corganization);
            $("#cdepartment").val(doc.data().cdepartment);
            $("#corganizationweb").val(doc.data().corganizationweb);
            $("#caddress").val(doc.data().caddress);
            $("#caddinfo").val(doc.data().caddinfo);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

/*****************************VI broadcast Work Avialable**********************************/

// var recentlyAdded = document.getElementById('recentlyAdded');
var query = workCollection.where("status", "==", 1).orderBy("createdAt","desc");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("VIworkAvailable") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    document.createElement("createdAt").innerHTML = now;
                    document.getElementById("VIworkAvailable").innerHTML += "<div class='custom-clickable-h4'><h5>"+change.doc.data().workTitle+
                    "</h5><p class='text-muted'>Created at: "+change.doc.data().createdAt.toDate()+"</p></div><hr>" 
                }
            }catch(err){}
        });
    }    
});

/*****************************Click on Work Available  WorkTitle**********************************/

$(document).on('click', '.custom-clickable-h4', function(e){
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
    window.location.href = "VI-workavailable.html";
});
/*****************************Click on forMe  WorkTitle**********************************/

$(document).on('click', '.custom-clickable-forMe', function(e){
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
    window.location.href = "VI-for-me.html";
});

/*****************************Click on forMe  WorkTitle for External VI**********************************/

$(document).on('click', '.custom-clickable-EVIforMe', function(e){
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
    window.location.href = "EVI-for-me.html";
});

/*****************************Click on Assigned Work for VI**********************************/

$(document).on('click', '.custom-clickable-VIAssignedWork', function(e){
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
    window.location.href = "VI-for-me.html";
});

/*****************************Click on In Progress Work for VI**********************************/

$(document).on('click', '.custom-clickable-VIAssignedWork', function(e){
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
    window.location.href = "VI-for-me.html";
});


/*****************************CRM Work Avialable Title**********************************/

// var recentlyAdded = document.getElementById('recentlyAdded');
var query = workCollection.where("status", "==", 1).orderBy("createdAt","desc");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMworkavailable") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    document.createElement("createdAt").innerHTML = now;
                    document.getElementById("CRMworkavailable").innerHTML += "<div class='custom-clickable-CRMWA'><h5>"+change.doc.data().workTitle+
                    "</h5><p class='text-muted'>Created at: "+change.doc.data().createdAt.toDate()+"</p></div><hr>" 
                }
            }catch(err){}
        });
    }    
});
/*****************************Click on Work Available  WorkTitle**********************************/

$(document).on('click', '.custom-clickable-CRMWA', function(e){
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
    window.location.href = "CRM-workavailable.html";
});
  
//Success Message
  $('#sa-success').click(function () {
    swal(
        {
            title: 'Message Sent To CRM!',
            text: '',
            type: 'success',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger ml-2'
        }
    )
});

/*****************************CRM Assigned To Broadcast**********************************/

// var recentlyAdded = document.getElementById('recentlyAdded');
var query = workAssignedCol.orderBy("AssignedAt","desc");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMassignedTo") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    document.createElement("AssignedAt").innerHTML = now;
                    if(change.doc.data().status != 4){
                    document.getElementById("CRMassignedTo").innerHTML += "<div class='custom-clickable-CRMAssignmentTo'><h5>"+change.doc.data().workTitle+
                    "</h5><p class='text-muted'>VI : "+change.doc.data().assignedTo+" | Assigned at: "+change.doc.data().AssignedAt.toDate()+"</p></div><hr>"
                    } 
                }
            }catch(err){}
        });
    }    
});

/*****************************CRM Work Assigned Table**********************************/

var query = workAssignedCol.orderBy("AssignedAt","desc");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMworkAssignedtable") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    
                    document.createElement("createdAt").innerHTML = now;
                    if(change.doc.data().status != 4 && change.doc.data().status != 6){
                        localStorage.setItem("workAssignedId", change.doc.id);
                        document.getElementById("CRMworkAssignedtable").innerHTML +=
                        "<tr class='custom-clickable-crm-done'><td>"+change.doc.data().assignedTo+"</td><td>"+change.doc.data().workTitle+"</td><td>"+change.doc.data().points+"</td><td>"+change.doc.data().timeRequired+
                        "</td><td><span class='badge badge-soft-warning'>"+change.doc.data().Completestatus+
                        "</span></td></tr>"
                    }
                    
                }
            }catch(err){}
        });
    }    
});
/*********************************CRM - done ************************************************/
$(document).on('click', '.custom-clickable-crm-done', function(e){
    // var url = $(this).data('href');
    e = e || window.event;

    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("td");
       
        //storing workTitle to local storage
        localStorage.setItem("workTitle", cells[1].innerHTML);
        //alert(cells[0].innerHTML);
        localStorage.setItem("assignedTo", cells[0].innerHTML);
    }
    
    //redirecting to add-work-edit
    window.location.href = "CRM-done-form.html";
});
/***********************************On clicking Work done button****************************************/

var WorkDone = document.querySelector("#workDone");
var Completestatus = document.getElementById('cWorkStatus');
if(WorkDone)
{
    
$("#workDone").on("click", function() {
    if(Completestatus.value == "Completed"){
        if(confirm("Are you sure the work is done ?")){
    database.collection("workAssigned").doc(localStorage.getItem("workAssignedId")).update({
        "status": 6,//Work done
         "Completestatus" : "Done"
    })
    .then(function() {
       
        alert("Work Done Succesfully");
        console.log("Work Done Succesfully");
        window.location.href = "CRM-dashboard.html";
    });
    }else{
        window.location.href = "CRM-dashboard.html";
    }
}
    else{
            alert("The Work should be completed");
            console.log("The Work should be completed"); 
        } 
});
}

/****************************Manager Fill Users Table****************************/
userCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("usersDisplay") != null){
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                if(change.doc.data().userRole =="CRM" || change.doc.data().userRole =="VI" || change.doc.data().userRole =="External-VI"){
                document.getElementById("usersDisplay").innerHTML +="<tr class='custom-clickable-row-users'><td>"+change.doc.data().name+"</td><td>"+change.doc.data().useremail+"</td><td>"
                +change.doc.data().userSkillarr+"</td><td>"+change.doc.data().userRole+"</td></tr>"
                } 
            }
        });
    }
});

/****************************CRM Fill Users Table****************************/
userCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMusersDisplay") != null){
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                if(change.doc.data().userRole =="VI" || change.doc.data().userRole =="External-VI"){
                document.getElementById("CRMusersDisplay").innerHTML +="<tr class='custom-clickable-row-users'><td>"+change.doc.data().name+"</td><td>"+change.doc.data().useremail+"</td><td>"
                +change.doc.data().userSkillarr+"</td><td>"+change.doc.data().userRole+"</td></tr>"
                } 
            }
        });
    }
});

/****************************Store Users name on Clicking Users Table's Row****************************/

$(document).on('click', '.custom-clickable-row-users', function(e){
    // var url = $(this).data('href');
    e = e || window.event;

    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("td");

        //storing workTitle to local storage
        localStorage.setItem("name", cells[0].innerHTML);
    }
    
    // //redirecting to add-work-edit
    // window.location.href = "view-client-form.html";
});


/*******************************Fill CRM Interested div element***********************/
var query = workAssignedCol.where("Completestatus","==","Interested");
query.onSnapshot(function(querySnapshot) {
    if(document.getElementById("CRMInterested-div") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    //document.createElement("InterestedAt").innerHTML = now.getDate()+"/"+now.getMonth()+"/"+now.getFullYear();;
                   // if(change.doc.data().status == 4){
                    document.getElementById("CRMInterested-div").innerHTML += "<div class='custom-clickable-CRM-VIInterested'><h5>"+change.doc.data().workTitle+"</h5><p class='text-muted'>VI : "+change.doc.data().name+" | Interested at: "+change.doc.data().InterestedAt.toDate()+"</p></div><hr>"
                   // } 
                }
            }catch(err){}
        });
    }    
});
/*******************************Click CRM Assignemnet related div element***********************/

$(document).on('click', '.custom-clickable-CRM-VIInterested', function(e){
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
        window.location.href = "CRM-assign.html";
 });
 /****************************Loading of CRM-Assignment****************************/

 function fillAssignmentform() {
     workAssignedCol.where("workTitle", "==", localStorage.getItem("workTitle"))
     .get()
     .then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
              
             //Make all fields of form read-only
             $("#selectCategory").prop("disabled", true);
              $(".readonlytoggle").prop("readonly", true);
             $("#assignedTo").prop("disabled", true);
             //saving work id to local storage
             localStorage.setItem("workAssignedId", doc.id);
            
 
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
             $("#interestedVI").val(doc.data().name);
             $("#assignedTo").val(doc.data().assignedTo);
             $("#points").val(doc.data().points);
             $("#cWorkStatus").val(doc.data().Completestatus);
             
         });
     })
     .catch(function(error) {
         console.log("Error getting documents: ", error);
     });
 }
 /****************************Save Changes Button on CRM-Interested Assign Done****************************/

$("#AssignDone").on("click", function() {
    if(confirm("Are you sure you want to assign the work ?")){
    database.collection("workAssigned").doc(localStorage.getItem("workAssignedId")).update({
        "selectCategory": selectCategory.value,
        "shortCode": shortCode.value,
        "workTitle": workTitle.value,
        "workDescription": workDescription.value,
        "longDescription": longDescription.value,
        "timeRequired": timeRequired.value,
        "skillsRequired": skillsRequired.value,
        "toolsRequired": toolsRequired.value,
        "clientQuestions": clientQuestions.value,
        "videoTraining": videoTraining.value,
        "workFolder": workFolder.value,
        "workWikipedia": workWikipedia.value,
        "relatedWork": relatedWork.value,
        "assignedTo" : assignedTo.value,
        "points" : points.value,
        "status": 5,
        "Completestatus": "Assigned",
        AssignedAt: now
        
    })
    .then(function() {
       window.location.href = "CRM-broadcast.html";
        alert("Assignment Succesfully");
        console.log("Assignment Succesfully");
        window.location.href = "CRM-broadcast.html";
    });
}else{
    window.location.href = "CRM-assign.html";
}
});

/****************************External VI Reject Work****************************/
if(document.getElementById("rejectWork")){
    document.getElementById("rejectWork").addEventListener('click', e =>
    {
    e.preventDefault();
    if(confirm("Are you sure that you want to reject the work ?")){
        database.collection("workAssigned").doc(localStorage.getItem("workAssignedId")).update({
            "status": 7, //7 is rejected work
            "Completestatus": "Rejected"
        })
        .then(() => { 
            alert('Work Rejected Succesfully and notified to CRM');
            window.location.href = "VI-broadcast.html";
            
    })
        .catch(error => {console.error(error)});    
    }
    else{
        window.location.href = "EVI-for-me.html";
    }
    
    }
    )
}


/*******************************Fill CRM Rejcted div element***********************/
var rejectquery = workAssignedCol;
rejectquery.onSnapshot(function(querySnapshot) {
    if(document.getElementById("VIRejected-div") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            try{
                if(change.type === "added"){
                    //document.createElement("InterestedAt").innerHTML = now.getDate()+"/"+now.getMonth()+"/"+now.getFullYear();;
                   if(change.doc.data().status == 7){
                    document.getElementById("VIRejected-div").innerHTML += "<div class='custom-clickable-CRM-VIInterested'><h5>"+change.doc.data().workTitle+"</h5><p class='text-muted'>VI : "+change.doc.data().assignedTo+"</p></div><hr>"
                   } 
                }
            }catch(err){}
        });
    }    
});

/****************************Fill Assigned To Dropdown****************************/

var sc = document.getElementById('assignedTo');

userCollection.onSnapshot(function(querySnapshot) {
    if(document.getElementById("assignedTo") != null){
        // doc.data() is never undefined for query doc snapshots
        querySnapshot.docChanges().forEach(function(change,i){
            if(change.type === "added"){
                if(change.doc.data().userRole == "VI" || change.doc.data().userRole == "External-VI"){
               document.getElementById("assignedTo").innerHTML += "<option>" + change.doc.data().name + "</option>"
            }
        }
        });
    }
});

/****************************Save As New Button (Copy of Work) in Work Collection****************************/

$("#saveAsNew").on("click", function() {
    if(confirm("Save Work ?")){
        // if (document.getElementById("workTitle") != localStorage.getItem("workTitle")) {
    database.collection("Work").add({
        "selectCategory": selectCategory.value,
        "shortCode": shortCode.value,
        "workTitle": workTitle.value,
        "workDescription": workDescription.value,
        "longDescription": longDescription.value,
        "timeRequired": parseFloat(timeRequired.value),
        "skillsRequired": skillsRequired.value,
        "toolsRequired": toolsRequired.value,
        "clientQuestions": clientQuestions.value,
        // "trainingPDF": trainingPDF.value,
        "videoTraining": videoTraining.value,
        "workFolder": workFolder.value,
        "workWikipedia": workWikipedia.value,
        "relatedWork": relatedWork.value,
        "status": 8,
        createdAt: now
    })
    .then(function() {
        // window.location.href = "work.html";
         alert("Work Inserted Succesfully");
         console.log("Work Inserted Succesfully");
     }); 
    if(assignedTo != "" && points.value !="") 
    {
    database.collection("workAssigned").add({
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
        "assignedTo" : assignedTo.value,
        "points" : points.value,
        "status": 5,
        "Completestatus": "Assigned",
        "AssignedAt": now
        
    }).then(function() {
        database.collection("Work").doc(localStorage.getItem("workId")).update({
            "status":5
        })
       // window.location.href = "work.html";
        alert("Work Assigned Succesfully");
        console.log("Work Assigned Succesfully");
        // window.location.href = "broadcast.html"
    });
}
    }
    // else{
    //     alert("Work Title should be different");
    // } 
    // }
    // else{
    //     // window.location.href = "workavailable.html"
    // }
});

/****************************Not displaying Copy of Work on UI****************************/

// workCollection.where("status", "==", 1).onSnapshot(function(querySnapshot) {
//     if(document.getElementById("workDisplay") != null){
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("workDisplay").innerHTML +="<tr class='custom-clickable-row'><td>"+change.doc.data().workTitle+"</td><td>"+change.doc.data().selectCategory+"</td><td>"
//                 +change.doc.data().workDescription+"</td><td>"+change.doc.data().skillsRequired+"</td><td>"+change.doc.data().toolsRequired+"</td></tr>"
//             }
//         });
//     }
// });