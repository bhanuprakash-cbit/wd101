let user_form = document.getElementById("user-form");

function validateAge(dob) {
  const d = new Date(dob);
  const p = new Date();
  const age = p.getFullYear() - d.getFullYear();
  return age >= 18 && age <= 55;
}

const retrieveUserEntries = () => {
  let retrievedData = localStorage.getItem("user-entries");
  if (retrievedData) {
    retrievedData = JSON.parse(retrievedData);
  } else {
    retrievedData = [];
  }
  return retrievedData;
};

let userEntries = retrieveUserEntries();

let displayData = () => {
  const entries = retrieveUserEntries();
  const tableRows = entries
    .map((x) => {
      const nameElement = `<td class='border px-4 py-2'>${x.name}</td>`;
      const emailElement = `<td class='border px-4 py-2'>${x.email}</td>`;
      const passwordElement = `<td class='border px-4 py-2'>${x.password}</td>`;
      const dobElement = `<td class='border px-4 py-2'>${x.dob}</td>`;
      const checkTermsElement = `<td class='border px-4 py-2'>${x.checkTerms}</td>`;

      const rowLine = `<tr>${nameElement} ${emailElement} ${passwordElement} ${dobElement} ${checkTermsElement}`;
      return rowLine;
    })
    .join("\n");

  const tableElement = `<table class="table-auto w-full "><tr>
  <th class="px-4 py-2">Name</th>
  <th class="px-4 py-2">Email</th>
  <th class="px-4 py-2">Password</th>
  <th class="px-4 py-2">Date of Birth</th>
  <th class="px-4 py-2">AcceptedTerms?</th>
  </tr>${tableRows}</table>`;

  let table = document.getElementById("user-entries");
  table.innerHTML = tableElement;
};

const saveUserEntries = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const checkTerms = document.getElementById("checkTerms").checked;

  if (validateAge(dob)) {
    const entry = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      checkTerms: checkTerms,
    };
    userEntries.push(entry);
  } else {
    alert("Age should be between 18 and 55");
  }

  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayData();
};

user_form.addEventListener("submit", saveUserEntries);

displayData();
