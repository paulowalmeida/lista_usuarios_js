let allUsers = null;

function start() {
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
    }) => {
      return {
        id: uuid,
        name: `${first} ${last}`,
        gender,
        age,
        email,
      };
    }
  );
  console.log(allUsers);
  render();
}

function render() {
  renderUsersList();
}

function renderUsersList() {
  let usersHTML = "<div>";
  allUsers.forEach(({ id, name, gender, age, email }) => {
    const userHTML = `
      <div id="userCard">
        
      </div>
    `;
  });
}

start();
