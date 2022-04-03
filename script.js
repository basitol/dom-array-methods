const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calcBtn = document.getElementById("calculate-wealth");

data = [];

// getRandomUser()
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = fetch("https://randomuser.me/api");
  const data = await (await res).json();

  const user = data.results[0];
  //   console.log(user);

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  //   console.log(newUser);
  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDom();
}

function updateDom(providedData = data) {
  // Clear field
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
});
