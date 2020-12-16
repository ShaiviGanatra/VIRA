//Add Category Form
const categoryName = document.getElementById('categoryName');
const categoryShortname = document.getElementById('categoryShortname');
const categoryDescription = document.getElementById('categoryDescription');

const database = firebase.firestore();
const categoryCollection = database.collection('Category')
//Add Category Function

submitCategory.addEventListener('click', e =>
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

