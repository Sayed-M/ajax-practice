var pageCounter = 1;
var fetchData = document.getElementById('fetchData');
var fetchedData = document.getElementById('fetchedData');

fetchData.addEventListener('click', function () {
  var xhr = new XMLHttpRequest();

  var url = 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json';

  xhr.onload = function() {
    var myData = JSON.parse(xhr.response);

    renderHTML(myData);

  };

  pageCounter++;

  if (pageCounter > 3) {
    fetchData.classList.add('hide-me');
  }

  xhr.open('GET', url);

  xhr.send();
});

function renderHTML(data) {

  var htmlString = '';

  for (i = 0; i < data.length; i++) {

    htmlString += '<p>' + data[i].name + ' is a ' + data[i].species + ' that likes to eat ';

    for (ii = 0; ii < data[i].foods.likes.length; ii++) {
      
      if (ii == 0) {
        htmlString += data[i].foods.likes[ii];
      } else {
        htmlString += ' and ' + data[i].foods.likes[ii];
      }

    }

    htmlString += ' and dislikes ';

    for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
      
      if (ii == 0) {
        htmlString += data[i].foods.dislikes[ii];
      } else {
        htmlString += ' and ' + data[i].foods.dislikes[ii];
      }

    }

    htmlString += '.</p>'

  }

  fetchedData.insertAdjacentHTML('beforeend', htmlString);

}