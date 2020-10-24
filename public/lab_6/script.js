// You may wish to find an effective randomizer function on MDN.

// Random Number Function
function getRandomInt(min, max) {
  min1 = Math.ceil(min);
  max1 = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
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
      // No. 14
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }

      // Question 10
      // Create an empty array of 10 elements
      const Arr = range(10);
      const CountArr = Arr.map(() => {
        const randNum = getRandomInt(0, 243);
        return fromServer[randNum];
      });

      // Question 11 Reverse Alphabetical Order
      const revArr = CountArr.sort((a, b) => sortFunction(b, a, 'name'));

      // Question 12: Injecting Ordered List element w/ classname "flex-inner"
      const olist = document.createElement('olist');
      olist.ClassName = 'flex-inner';
      $('form').prepend(olist);

      // Question 13
      revArr.forEach((element) => {
        const list = document.createElement('list');
        $(list).append(`<input type="checkbox" value=${element.code} id=${element.code}>`);
        $(list).append(`<label for=${element.code}>${element.name}</label>`);
        $(olist).append(list);
      });
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});