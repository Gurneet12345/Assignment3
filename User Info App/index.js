const API_URL = "https://reqres.in/api/users";

let userInfoData = [];
const userContainer = document.getElementById("user-container");

async function getUserInfo() {
  // JUST TO UNDERSTAND HOW IT WORKS WITH THEN CATCH BLOCK
  // fetch(API_URL).then((data) => {
  //     return data.json();
  // }).then((dataJSON) => {
  //     createCardUI();
  // }).catch((error) => {
  //     userInfoData = dataInJson.data || [];
  // })
  try {
    const data = await fetch(API_URL);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    generateAllCards(userInfoData)
  } catch (error) {
    console.log("There was an error", error);
    userInfoData = [];
  }
}

function createCardUI(user) {
  let cardUI = `<div class="card  m-4" style="width: 18rem;">
  <img src=${user.avatar} class="card-img-top" alt="...">
  <div class="card-body">
    <h1>${user.first_name} ${user.last_name}</h1>
    <p class="card-text">${user.email}</p>
  </div>
  <button class="btn btn-primary">Get Details</button>
</div>`;

  userContainer.innerHTML += cardUI;
}

function generateAllCards(userData = []) {
    for(let i = 0 ; i < userData.length; i++) {
        createCardUI(userData[i]);
    }
}

async function getUserDetails(userId) {
  try {
      const userDetails = await fetch(`${API_URL}/${userId}`);
      const userDetailsData = await userDetails.json();

      
      const modalContent = `
          <h2>${userDetailsData.data.first_name} ${userDetailsData.data.last_name}</h2>
          <p>Email: ${userDetailsData.data.email}</p>
          <!-- Add more details as needed -->
      `;
      userDetailsContent.innerHTML = modalContent;
  } catch (error) {
      console.error("Error fetching user details", error);
  }
}


document.addEventListener("click", async function (event) {
  if (event.target && event.target.matches(".btn-primary")) {
      const userId = event.target.getAttribute("data-userid");
      await getUserDetails(userId);
  }
});

function createCardUI(user) {
  let cardUI = `
    <div class="card  m-4" style="width: 18rem;">
        <img src=${user.avatar} class="card-img-top" alt="...">
        <div class="card-body">
            <h1>${user.first_name} ${user.last_name}</h1>
            <p class="card-text">${user.email}</p>
        </div>
        <button class="btn btn-primary" data-toggle="modal" data-target="#userDetailsModal" data-userid="${user.id}">Get Details</button>
    </div>
    `;

  userContainer.innerHTML += cardUI;
}




getUserInfo();
