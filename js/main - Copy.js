// Full array of image objects
let imageText = [
  { name: '01.jpg', title: 'Hay Bales',        text: 'I love hay bales. Took this snap on a drive through the countryside past some straw fields.' },
  { name: '02.jpg', title: 'Lake',             text: 'The lake was so calm today. We had a great view of the snow on the mountains from here.' },
  { name: '03.jpg', title: 'Canyon',           text: 'I hiked to the top of the mountain and got this picture of the canyon and trees below.' },
  { name: '04.jpg', title: 'Iceberg',          text: 'It was amazing to see an iceberg up close, it was so cold but didn’t snow today.' },
  { name: '05.jpg', title: 'Desert',           text: 'The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons.' },
  { name: '06.jpg', title: 'Fall',             text: 'Fall is coming, I love when the leaves on the trees start to change color.' },
  { name: '07.jpg', title: 'Plantation',       text: 'I drove past this plantation yesterday, everything is so green!' },
  { name: '08.jpg', title: 'Dunes',            text: 'My summer vacation to the Oregon Coast. I love the sandy dunes!' },
  { name: '09.jpg', title: 'Countryside Lane', text: 'We enjoyed a quiet stroll down this countryside lane.' },
  { name: '10.jpg', title: 'Sunset',           text: 'Sunset at the coast! The sky turned a lovely shade of orange.' },
  { name: '11.jpg', title: 'Cave',             text: 'I did a tour of a cave today and the view of the landscape below was breathtaking.' },
  { name: '12.jpg', title: 'Bluebells',        text: 'I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in.' }
];

// Populates gallery divs with html and image info for lightbox plugin.
// Is called by divLoop() below.
function imageLoop(array) { // accepts one argument, either full array of image objects or subset
  for (let i = 0; i < array.length; i += 1) {
    let j = i + 1; // initialize counter for setting div IDs
    let html = ""; // initialize variable to hold html content for output. Inside function so it's cleared each time function is called.
    html += "<a href='images/" + array[i].name + "' ";
    html += " data-lightbox='gallery'";
    html += " data-alt='" + array[i].title + "' ";
    html += " data-title='<h1>" + array[i].title + "</h1><p>";
    html += array[i].text + "</p>'>";
    html += "<img class='roundedBorder' src='images/thumbnails/" + array[i].name + "'>";
    html += "</a>";
    $(`#${j}`).html(html); // selects divs by ID, sets html content to html variable
  }
}

// Generates divs for image thumbnails.
// Is called by either compare() or document.ready() functions below.
function divLoop(array) { // accepts one argument, either full array or subset
  let divOutput = ""; // initialize variable to hold html content for output. Inside function so it's cleared each time function is called.
  for (let i = 1; i <= array.length; i += 1) {
    divOutput += "<div class='thumbnail' id='" + i + "'></div>";
  }
  $('#gallery').html(divOutput); // selects div with ID of "gallery", sets html content to divOutput
  imageLoop(array); // calls imageLoop() function to populate newly created divs
}

// Compares user input to text property of imageText array; builds new subset array
// function compare(input, array) {
//   let newArray = []; // initialize new array to hold subset of imageText
//   for (let i = 0; i < array.length; i += 1) { // loop through imageText array
//     let text = array[i].text.toLowerCase(); // convert array text to lower case and store in text variable
//     if ( text.includes(input) === true ) { // if searchTerm/input matches the array text
//       newArray.push(array[i]); // push that object to newArray
//     }
//   }
//   divLoop(newArray); // calls divLoop function and passes it a subset of the array
// }

// Captures user search input, calls compare() function, passes user input and imageText array as arguments
// $('#photoSearch').on('keyup', function(event){ // listen for keyup event on photoSearch input
//   let userInput = ''; // initialize empty string variable
//   userInput += $(this).val().toLowerCase(); // set variable to lowercase value of user input
//   compare(userInput, imageText); // call compare() function, pass it userInput and full imageText array
// });

// Calls divLoop on page load to build full gallery
$(document).ready(function(){
  divLoop(imageText); // calls divLoop function and passes it the full array
});
