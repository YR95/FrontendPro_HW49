//Pulman,Mass,Picoult

resulResponseAutor = [];

const API = "AIzaSyD-bBO1Xn8SCKvOQ3v2QjRsrHD2FwilA9M";
let isbn = document.querySelector("#isbn").value;
let bookName = document.querySelector("#bookName").value;

let isbnBuuton = document.querySelector("#isbnButton");
let authorButton = document.querySelector("#authorButton");
let bookNameButton = document.querySelector("#bookNameButton");

function clearAllInputs() {
  isbn = "";
  author = "";
  bookName = "";
}

authorButton.addEventListener("click", (ev) => {
  resulResponseAutor = [];
  let author = document.querySelector("#author").value;
  const query = `inauthor:"${encodeURIComponent(author)}"`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.items) {
      data.items.forEach(item => {
        let obj = {};
        obj.title = item.volumeInfo.title;
        obj.authorName = item.volumeInfo.authors;
        obj.image = item.volumeInfo.imageLinks!==undefined
            ? item.volumeInfo.imageLinks.thumbnail : "unknown.png";
        obj.publishedData = item.volumeInfo.publishedDate;
        obj.pageCount = item.volumeInfo.pageCount;
        resulResponseAutor.push(obj);
        console.log(obj);
      });
      renderElements(resulResponseAutor);

    } else {
      console.log(`No books found by ${author}`);
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

});

function renderElements(arrays) {
  document.querySelector("#result").innerHTML = "";
  clearAllInputs();

  arrays.forEach(value => {
    let divPerBlock = document.createElement("div");
    divPerBlock.id = `divPerBlock${value}`;
    divPerBlock.classList = "divPerBlock";
//TITLE

    let divTitle = document.createElement("div");
    divTitle.id = `divTitle${value}`;

    let labelTitle = document.createElement("p");
    labelTitle.id = `labelTitle${value}`;
    labelTitle.innerText = "Title: ";
    labelTitle.classList = "labelValue";

    let titleP = document.createElement("p");
    titleP.id = `titleP${value}`;
    titleP.innerText = value.title;
    divTitle.append(labelTitle, titleP);
    divTitle.classList = "answeBlock";
//AUTHOR
    let divAuth = document.createElement("div");
    divAuth.id = `divAuth${value}`;
    let labelAuth = document.createElement("p");
    labelAuth.id = `labelauth${value}`;
    labelAuth.innerText = "Author: ";
    labelAuth.classList = "labelValue";

    let authorNameP = document.createElement("p");
    authorNameP.id = `auth${authorNameP}`;
    authorNameP.innerText = value.authorName;
    divAuth.append(labelAuth, authorNameP);
    divAuth.classList = "answeBlock";
//DATE PUBLISHMENT
    let divDate = document.createElement("div");
    divDate.id = `divDate${value}`;
    let labelDate = document.createElement("p");
    labelDate.id = `labelDate${value}`;
    labelDate.innerText = "Date of publish: ";
    labelDate.classList = "labelValue";

    let datePunlish = document.createElement("p");
    datePunlish.id = `data${value}`;
    datePunlish.innerText = value.publishedData;
    divDate.append(labelDate, datePunlish);
    divDate.classList = "answeBlock";
//PAGES
    let divPage = document.createElement("div");
    divPage.id = `divPage${value}`;
    let labelPage = document.createElement("p");
    labelPage.id = `labelPage${value}`;
    labelPage.innerText = "Pages: ";
    labelPage.classList = "labelValue";

    let datePage = document.createElement("p");
    datePage.id = `datePage${value}`;
    datePage.innerText = value.pageCount;
    divPage.append(labelPage, datePage);
    divPage.classList = "answeBlock";
//IMAGES

    let divImage = document.createElement("div");
    divImage.id = `divImage${value}`;
    let labeImage = document.createElement("p");
    labeImage.id = `image${value}`;
    labeImage.innerText = "Book cover: ";
    labeImage.classList = "labelValue";

    let image = document.createElement("img");
    image.id = `datePage${value}`;
    image.src = value.image;
    image.classList = "img";

    divImage.append(labeImage, image);
    divImage.classList = "answeBlock";

    divPerBlock.append(divTitle, divAuth, divDate, divPage, divImage);

    document.querySelector("#result").append(divPerBlock);
  });

}

