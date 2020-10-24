
// You may wish to find an effective randomizer function on MDN.

// Random Number Function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Range Function
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

// Sort Function
function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // Start of my Lab Code 
      // Question 14: Remove list from website when button is clicked
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }

      // Question 10
      // Create an empty array of 10 elements
      const Arr = range(10);
      const CountArr = Arr.map(() => {
        const ranNum = getRandomInt(244);
        return fromServer[ranNum];
      });

      // Question 11 Reverse Alphabetical Order
      const revArr = CountArr.sort((a, b) => sortFunction(b, a, 'name'));

      // Question 12
      const oList = document.createElement('ol');
      oList.className = 'flex-inner';

      $('form').prepend(oList);

      const Flex = document.querySelector('.flex-inner');

      revArr.forEach((element) => {
        const List = Flex.appendChild(document.createElement('li'));
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('id', `${element.code}`);
        checkBox.setAttribute('value', `${element.code}`);
        checkBox.setAttribute('name', `${element.name}`);

        const Label = document.createElement('label');
        Label.setAttribute('for', `${element.code}`);
        Label.innerText = `${element.name}`;

        List.appendChild(checkBox);
        List.appendChild(Label);
        $(oList).append(List);
      });
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});