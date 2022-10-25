const overlay = document.querySelector('#overlay');
const employeeDetails = document.querySelector('#employee-details');
const cards = document.querySelectorAll('.employee-card');
let results = [];
const states = [
  { name: 'alabama', abbr: 'AL'},
  { name: 'alaska', abbr: 'AK'},
  { name: 'american samoa', abbr: 'AS'},
  { name: 'arizona', abbr: 'AZ'},
  { name: 'arkansas', abbr: 'AR'},
  { name: 'california', abbr: 'CA'},
  { name: 'colorado', abbr: 'CO'},
  { name: 'connecticut', abbr: 'CT'},
  { name: 'delaware', abbr: 'DE'},
  { name: 'district of columbia', abbr: 'DC'},
  { name: 'florida', abbr: 'FL'},
  { name: 'georgia', abbr: 'GA'},
  { name: 'guam', abbr: 'GU'},
  { name: 'hawaii', abbr: 'HI'},
  { name: 'idaho', abbr: 'ID'},
  { name: 'illinois', abbr: 'IL'},
  { name: 'indiana', abbr: 'IN'},
  { name: 'iowa', abbr: 'IA'},
  { name: 'kansas', abbr: 'KS'},
  { name: 'kentucky', abbr: 'KY'},
  { name: 'louisiana', abbr: 'LA'},
  { name: 'maine', abbr: 'ME'},
  { name: 'marshall islands', abbr: 'MH'},
  { name: 'maryland', abbr: 'MD'},
  { name: 'massachusetts', abbr: 'MA'},
  { name: 'michigan', abbr: 'MI'},
  { name: 'minnesota', abbr: 'MN'},
  { name: 'mississippi', abbr: 'MS'},
  { name: 'missouri', abbr: 'MO'},
  { name: 'montana', abbr: 'MT'},
  { name: 'nebraska', abbr: 'NE'},
  { name: 'nevada', abbr: 'NV'},
  { name: 'new hampshire', abbr: 'NH'},
  { name: 'new jersey', abbr: 'NJ'},
  { name: 'new mexico', abbr: 'NM'},
  { name: 'new york', abbr: 'NY'},
  { name: 'north carolina', abbr: 'NC'},
  { name: 'north dakota', abbr: 'ND'},
  { name: 'northern mariana islands', abbr: 'NP'},
  { name: 'ohio', abbr: 'OH'},
  { name: 'oklahoma', abbr: 'OK'},
  { name: 'oregon', abbr: 'OR'},
  { name: 'pennsylvania', abbr: 'PA'},
  { name: 'puerto rico', abbr: 'PR'},
  { name: 'rhode island', abbr: 'RI'},
  { name: 'south carolina', abbr: 'SC'},
  { name: 'south dakota', abbr: 'SD'},
  { name: 'tennessee', abbr: 'TN'},
  { name: 'texas', abbr: 'TX'},
  { name: 'us virgin islands', abbr: 'VI'},
  { name: 'utah', abbr: 'UT'},
  { name: 'vermont', abbr: 'VT'},
  { name: 'virginia', abbr: 'VA'},
  { name: 'washington', abbr: 'WA'},
  { name: 'west virginia', abbr: 'WV'},
  { name: 'wisconsin', abbr: 'WI'},
  { name: 'wyoming', abbr: 'WY'}
];

// ------------------------------------
// FETCH FUNCTIONS
// ------------------------------------

// Fetches employee data from random user website,
// parses it from JSON into JS, sends the results to makeGallery(),
// and saves results to a variable for populating overlay details.
fetch('https://randomuser.me/api/?results=12&nat=us')
.then(response => response.json())
.then(response => {
  makeGallery(response.results);
  results = response.results;
});

// ------------------------------------
// EVENT LISTENERS
// ------------------------------------

// Adds listener to each individual card (to avoid slow response from event bubbling),
// captures card id, shows the overlay, then calls addDetails() and passes it
// the fetch results and the card id to build the overlay details.
for (let i = 0; i < cards.length; i += 1) {
  cards[i].addEventListener('click', (event) => {
    let id = event.target.id;
    if (id == null || id == '') {
      id = event.target.parentNode.id;
      if (id == null || id == '') {
        id = event.target.parentNode.parentNode.id;
      }
    }
    overlay.style.display = 'flex';
    addDetails(results, id);
  });
}

// ------------------------------------
// OTHER FUNCTIONS
// ------------------------------------

// Creates the intial gallery of employee cards
function makeGallery(results) {
  for (let i = 0; i < results.length; i += 1) {
    let employeeCard = '';
    employeeCard += `
      <img class="profile-pic" alt="profile picture" src="${results[i].picture.large}">
      <div class="employee-info">
        <h4>${results[i].name.first + ' ' + results[i].name.last}</h4>
        <p>${results[i].email}</p>
        <p class="city">${results[i].location.city}</p>
      </div>
    `;
    cards[i].innerHTML = employeeCard;
  }
}

// Adds the details of the clicked employee to the overlay
function addDetails(results, id) {
  let index = parseInt(id.slice(4, id.length)) - 1;
  let state = results[index].location.state;
  let abbreviation = convertState(state);
  let dob = results[index].dob.date;
  let birthday = convertBDay(dob);
  let details = `
    <button class="x">&times;</button>
    <img class="profile-pic-lg" alt="profile picture" src="${results[index].picture.large}">
    <h4>${results[index].name.first + ' ' + results[index].name.last}</h4>
    <p>${results[index].email}</p>
    <p class="city">${results[index].location.city}</p>
    <hr>
    <p class="phone">${results[index].cell.replace(')-', ') ')}</p>
    <p class="address">
      ${results[index].location.street + ', ' +
      abbreviation + ' ' + '&nbsp;' +
      results[index].location.postcode}</p>
    <p class="birthday">Birthday: ${birthday}</p>
  `;
  employeeDetails.innerHTML = details;

  // Hides the overlay when the x is clicked
  let x = document.querySelector('.x');
  x.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}

// Converts state name to abbreviation
function convertState(name) {
   let abbreviation = states
    .filter(state => name === state.name)
    .map(state => state.abbr);
    return abbreviation;
}

// Converts dob to dd/mm/yy format
function convertBDay(dob) {
  let year = dob.slice(0,4);
  let month = dob.slice(5,7);
  let day = dob.slice(8,10);
  let converted = month + '/' + day + '/' + year;
  return converted;
}
