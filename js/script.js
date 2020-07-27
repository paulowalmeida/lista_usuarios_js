let allUsers = null;
let allUsersFiltered = null;
let userList = null;
let userInfo = null;
let container = null;

function start() {
  container = document.querySelector(".container");
  container.classList.add("hide");
  userList = document.querySelector("#user-list");
  userInfo = document.querySelector("#users-info");

  fetchUsers();
}

async function fetchUsers() {
  const result = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await result.json();
  allUsers = json.results.map(
    ({
      name: { first, last },
      dob: { age },
      gender,
      email,
      login: { uuid },
      picture: { medium },
    }) => {
      return {
        id: uuid,
        name: `${first} ${last}`,
        gender,
        age,
        email,
        photoURL: medium,
      };
    }
  );
  allUsers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  allUsersFiltered = [...allUsers];
  render();
}

function render() {
  renderUsersList();
  summary();
  hideLoading();
  configFilter();
}

function renderUsersList() {
  let usersHTML = "<div>";
  allUsers.forEach(({ id, name, gender, age, email, photoURL }) => {
    const userHTML = `
      <div id="user-item">
        <div>    
          <img src="${photoURL}" alt="Foto de Usuário" title="${name}">
        </div>
        <div>
          <ul>
            <li><h5>${name}, ${age} anos</h5></li>
            <li>${email}</li>
          </ul>
        </div>
      </div>

    `;
    usersHTML += userHTML;
  });
  usersHTML += "</div>";
  userList.innerHTML = usersHTML;
}

function summary() {}

function hideLoading() {
  setTimeout(() => {
    container.classList.remove("hide");
    const loading = document.querySelector("#loading");
    loading.classList.add("hide");
  }, 1000);
}

function configFilter() {
  const button = document.querySelector("#button-filter");
  const inputFilter = document.querySelector("#input-filter");
  inputFilter.addEventListener("input", (event) => {
    if (event.target.value === "") {
      allUsers = [...allUsersFiltered];
      return;
    }
  });

  button.addEventListener("click", () => {
    const filterValue = inputFilter.value.toLowerCase().trim();
    allUsers = allUsersFiltered.filter((user) => {
      return user.name.toLowerCase().includes(filterValue);
    });
    render();
  });
}

start();
