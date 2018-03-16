'use strict';

// Include data for accessing Google APIs
var apiKey = 'AIzaSyAr9BMV3h7bbNMKNW4ev1v0cwgire_vU6M';
var url = 'https://www.googleapis.com/urlshortener/v1/url';

// Some page elements
var $inputField = $('#input');
var $expandButton = $('#expand');
var $shortenButton = $('#shorten');
var $responseField = $('#responseField');

// AJAX functions

async function expandUrl() {
  var urlToExpand = url + '?shortUrl=' + $inputField.val() + '&key=' + apiKey;
  try {
    var response = await fetch(urlToExpand);
    if (response.ok) {
      var jsonResponse = await response.json();
      $responseField.append('<p> Your expanded URL is </p><p>' + jsonResponse.longUrl + '</p>');
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
}

async function shortenUrl() {
  var urlToShorten = $inputField.val();
  var urlWithKey = url + '?key=' + apiKey;
  try {
    var response = await fetch(urlWithKey, {
      method: 'POST',
      body: JSON.stringify({ longUrl: urlToShorten }),
      headers: {
        "Content-type": "application/json"
      }
    });
    if (response.ok) {
      var jsonResponse = await response.json();
      $responseField.append('<p> Your shortened URL is </p><p>' + jsonResponse.id + '</p>');
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
}

// Clear page and call AJAX functions
function expand() {
  $responseField.empty();
  expandUrl();
  return false;
};

function shorten() {
  $responseField.empty();
  shortenUrl();
  return false;
};

$expandButton.click(expand);
$shortenButton.click(shorten);