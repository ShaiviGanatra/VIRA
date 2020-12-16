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

saveDraft.addEventListener('click', e =>
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
