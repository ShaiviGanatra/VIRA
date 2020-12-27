/****************************Add Work****************************/ 

let selectCategory = document.getElementById('selectCategory');
let shortCode = document.getElementById('shortCode');
let workTitle = document.getElementById('workTitle');
let workDescription = document.getElementById('workDescription');
let longDescription = document.getElementById('longDescription');
let startDate = document.getElementById('startDate');
let endDate = document.getElementById('endDate');
let numDays = document.getElementById('numDays');
let skillsRequired = document.getElementById('skillsRequired');
let toolsRequired = document.getElementById('toolsRequired');
let clientQuestions = document.getElementById('clientQuestions');
// let trainingPDF = document.getElementById('trainingPDF');
let videoTraining = document.getElementById('videoTraining');
let workFolder = document.getElementById('workFolder');
let workWikipedia = document.getElementById('workWikipedia');
let relatedWork = document.getElementById('relatedWork');

let addworkform = document.querySelector("#addworkform");
let publish = document.querySelector("#publish");
let saveDraft = document.querySelector("#saveDraft");

let database = firebase.firestore();
let workCollection = database.collection('Work')

if(addworkform != null){
    // let d;
    if(publish)
    {
    publish.addEventListener("click" , async(e) =>
    {
        e.preventDefault();
        if(selectCategory.value != "" && shortCode.value != "" && workTitle.value != "" && workDescription.value != ""
        && longDescription.value != "" && startDate.value != "" && endDate.value != "" && numDays.value != "" && skillsRequired.value != "" && toolsRequired.value != "")
        {
            workCollection.add({
                selectCategory: selectCategory.value,
                shortCode: shortCode.value,
                workTitle: workTitle.value,
                workDescription: workDescription.value,
                longDescription: longDescription.value,
                startDate: startDate.value,
                endDate: endDate.value,
                numDays: numDays.value,
                skillsRequired: skillsRequired.value,
                toolsRequired: toolsRequired.value,
                clientQuestions: clientQuestions.value,
                // trainingPDF: trainingPDF.value,
                videoTraining: videoTraining.value,
                workFolder: workFolder.value,
                workWikipedia: workWikipedia.value,
                relatedWork: relatedWork.value,
                status: 1
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
                startDate: startDate.value,
                endDate: endDate.value,
                numDays: numDays.value,
                skillsRequired: skillsRequired.value,
                toolsRequired: toolsRequired.value,
                clientQuestions: clientQuestions.value,
                // trainingPDF: trainingPDF.value,
                videoTraining: videoTraining.value,
                workFolder: workFolder.value,
                workWikipedia: workWikipedia.value,
                relatedWork: relatedWork.value,
                status: 2
        
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

// const workDisplay = document.getElementById('workDisplay');

// workCollection.onSnapshot(function(querySnapshot) {
//     if(document.getElementById("workDisplay") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("workDisplay").innerHTML += "<div class='col-lg-6'><div class='card'><div class ='card-body'><h4>" + change.doc.data().workTitle + 
//                 "</h4><p>" +change.doc.data().workDescription+"</p><p class='card-text text-muted'>" 
//                 +change.doc.data().longDescription +"</p></div></div>"
//                 if(i!=0 && i%2 == 0){

//                     // add end of row ,and start new row on every 2 elements
//                     document.getElementById("workDisplay").innerHTML += '</div>'
//                   }
//             }
//         });
//         document.getElementById("workDisplay").innerHTML += '</div>'
//     }    
// });

/****************************Detailed Work-card****************************/

// const cardselectCategory = document.getElementById('cardselectCategory');

// workCollection.onSnapshot(function(querySnapshot) {
//     if(document.getElementById("cardselectCategory") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardselectCategory").innerHTML += change.doc.data().selectCategory
//             }
//         });
//         //document.getElementById("cardselectCategory").innerHTML += '</div>'
//     }    
//     if(document.getElementById("cardshortCode") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardshortCode").innerHTML += change.doc.data().shortCode
                
//             }
//         });
//     }   
//     if(document.getElementById("cardworkTitle") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardworkTitle").innerHTML += change.doc.data().workTitle
                
//             }
//         });
//     } 
//     if(document.getElementById("cardworkDescription") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardworkDescription").innerHTML += change.doc.data().workDescription
                
//             }
//         });
//     } 
//     if(document.getElementById("cardlongDescription") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardlongDescription").innerHTML += change.doc.data().longDescription
                
//             }
//         });
//     } 
//     if(document.getElementById("cardTimeRequired") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardTimeRequired").innerHTML += change.doc.data().timeRequired
                
//             }
//         });
//     }
//     if(document.getElementById("cardskillsRequired") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardskillsRequired").innerHTML += change.doc.data().skillsRequired
                
//             }
//         });
//     }
//     if(document.getElementById("cardtoolsRequired") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardtoolsRequired").innerHTML += change.doc.data().toolsRequired
                
//             }
//         });
//     }
//     if(document.getElementById("cardclientQuestion") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardclientQuestion").innerHTML += change.doc.data().clientQuestions
                
//             }
//         });
//     }
//     if(document.getElementById("cardvideoTraining") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardvideoTraining").innerHTML += change.doc.data().videoTraining
//             }
//         });
//     }
//     if(document.getElementById("cardworkFolder") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardworkFolder").innerHTML += change.doc.data().workFolder
//             }
//         });
//     }
//     if(document.getElementById("cardworkWikipedia") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardworkWikipedia").innerHTML += change.doc.data().workWikipedia
//             }
//         });
//     }
//     if(document.getElementById("cardrelatedWork") != null){
//         // doc.data() is never undefined for query doc snapshots
//         querySnapshot.docChanges().forEach(function(change,i){
//             if(change.type === "added"){
//                 document.getElementById("cardrelatedWork").innerHTML += change.doc.data().relatedWork
//             }
//         });
//     }
// });


/****************************Fill Select Category****************************/

const sc = document.getElementById('selectCategory');

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

const workDisplay = document.getElementById('workDisplay');
workCollection.onSnapshot(function(querySnapshot) {
     if(document.getElementById("workDisplay") != null){
         querySnapshot.docChanges().forEach(function(change,i){
             if(change.type === "added"){
                 document.getElementById("workDisplay").innerHTML +="<tr class='custom-clickable-row' data-href='add-work-edit.html'><td>"+change.doc.data().workTitle+"</td><td>"+change.doc.data().selectCategory+"</td><td>"
                 +change.doc.data().workDescription+"</td><td>"+change.doc.data().skillsRequired+"</td><td>"+change.doc.data().toolsRequired+"</td></tr>"
             }
         });
     }
 });


/****************************Open Each Work Table Info****************************/

var tbody = document.getElementsByTagName("tbody")[0];
 $(document).on('click', '.custom-clickable-row', function(e){
    // var url = $(this).data('href');
    e = e || window.event;
    var WorkTitle;
    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("td");
            WorkTitle = (cells[0].innerHTML);
    }
    // alert(WorkTitle);

    //to get doc id and rest data of the row being clicked by maping work title from firebase
    database.collection("Work").where("workTitle", "==", WorkTitle)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //window.location.href = "add-work-edit.html";
            console.log(doc.id, " => ", doc.data());
           if(doc.type === "added"){
            selectCategory= doc.data().selectCategory;
            shortCode=doc.data().shortCode;
            workTitle = doc.data().workTitle;
            workDescription = doc.data().workDescription;
            longDescription = doc.data().longDescription;
            startDate = doc.data().startDate;
            endDate = doc.data().endDate;
            numDays = doc.data().numDays;
            skillsRequired = doc.data().skillsRequired;
            toolsRequired = doc.data().toolsRequired;
            clientQuestions = doc.data().clientQuestions;
            videoTraining = doc.data().videoTraining;
            workFolder = doc.data().workFolder;
            workWikipedia = doc.data().workWikipedia;
            relatedWork = doc.data().relatedWork;
            }
            //redirecting to add-work-edit
            
            // $("selectCategory").value = selectCategory;
            // $("shortCode").value = shortCode;
            // $("workTitle").value = workTitle;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    
    
});

/*
let postsArray = [];

var dataSet = new Array();
var i=1;
database.collection("Work").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

        dataSet.push([doc.data().workTitle, doc.data().selectCategory,doc.data().workDescription,doc.data().skillsRequired,doc.data().toolsRequired]);
        i=i+1;

    });
    let data 
    $('#workDisplay').DataTable( {
                    data : dataSet,
                    columns: [
                            { title: "Work Title" },
                            { title: "Category" },
                            { title: "Work Description" },
                            { title: "Skills Required" },
                            { title: "Tools Required" }
                    ]
                
            })
            .on('click', data, function () {
                window.location.href = "add-work-edit.html";
                //alert( 'You clicked on a row' );
            } );
               
});
*/ 

//pagination
const getWorkIdFromURL = () => {
    let workLocation = window.location.href;
    let hrefArray = workLocation.split("/");
    let workId = hrefArray.slice(-1).pop();
    
    return workId;
}
/****************************Calculation of Number of Days****************************/

function GetDays(){
    var startDt = new Date(document.getElementById("startDate").value);
    var endDt = new Date(document.getElementById("endDate").value);
    return parseInt((endDt - startDt) / (24 * 3600 * 1000));
}

function cal(){
if(document.getElementById("startDate")){
document.getElementById("numDays").value=GetDays() + " days";
} 
}