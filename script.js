const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-result");

let usersResult = [];

function UserHTML(props) {
  return `
  <div class="user">
    <img src="${props.imgSrc}" class="user-img"/>
    <div class="user-info">
      <h4 class="user-name">${props.fullname}</h4>
      <p class="user-location">${props.location}</p>
    </div>
  </div>
  `;
}

async function getRandomUsers(count = 10) {
  const resp = await fetch(`https://randomuser.me/api?results=${count}`);
  const { results } = await resp.json();

  return results.map((user) => {
    return {
      imgSrc: user.picture.thumbnail,
      fullname: `${user.name.first} ${user.name.last}`,
      location: `${user.location.state}, ${user.location.country}`,
    };
  });
}

function renderUsersHTML(users = []) {
  const usersHtml = users.map((user) => {
    return `
    <li class="search-restult-item">
      ${UserHTML(user)}
    </li>
    `;
  });

  searchResult.innerHTML = usersHtml.join("");
}

function filterUsersBy(criteria = "", users = []) {
  return users.filter(function ({ fullname, location }) {
    return fullname.includes(criteria) || location.includes(criteria);
  });
}

searchInput.addEventListener("input", function () {
  const criteria = searchInput.value.trim();
  if (!criteria) return renderUsersHTML(usersResult);
  renderUsersHTML(filterUsersBy(criteria, usersResult));
});

getRandomUsers(50).then(function (users) {
  usersResult = users;
  renderUsersHTML(usersResult);
});
