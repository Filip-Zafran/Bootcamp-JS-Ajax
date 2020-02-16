function fetchData() {

  fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
      headers: {
        'X-API-KEY': "MNSdvnHMiHaomf9rDuECFXnPtiGZrPndlZyTTlLz"

      }
    })
    .then(response => {

      let json = response.json();

      return json;
    })


    .then(result => {
      let members = result.results[0].members;

      createTable(members);
      dropFunct(members);
      defineEvent(members);
      dropEvent(members)


    })
    .catch(error => console.log(error));

}
fetchData()


function createTable(filteredMembers) {
  let TBL = document.getElementById("senate-data");
  TBL.innerHTML = "";


  for (var i = 0; i < filteredMembers.length; i++) {

    var tr = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.className = "td1style"

    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");



    td1.innerHTML =
      (filteredMembers[i].last_name || "") +
      " " +
      (filteredMembers[i].first_name || "") +
      " " +
      (filteredMembers[i].middle_name || "") +
      " ";

    td2.innerHTML = filteredMembers[i].party;
    td3.innerHTML = filteredMembers[i].state;
    td4.innerHTML = filteredMembers[i].seniority;
    td5.innerHTML = filteredMembers[i].votes_with_party_pct + " " + "%";


    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    var tbody = document.getElementById("senate-data");
    tbody.appendChild(tr);
  }
}




function defineEvent(members) {
  let checkBoxI = document.getElementById("democratsId");
  let checkBoxD = document.getElementById("republicansId");
  let checkBoxR = document.getElementById("independentsId");
  checkBoxD.addEventListener("click", function () {
    filter(members);
  });
  checkBoxI.addEventListener("click", function () {
    filter(members);
  });
  checkBoxR.addEventListener("click", function () {
    filter(members);
  });
}


function filter(members) {
  let checkBox = Array.from(
    document.querySelectorAll("input[name=party]:checked")

  );


  let checkBoxValue = checkBox.map(oneCheckbox => {
    return oneCheckbox.value;
  });


  let selectVar = document.getElementById("myDropdown").value

  let filteredArray = []
  if (selectVar == "" && checkBoxValue.lenght == 0) {
    filteredArray = members
  } else if (selectVar !== "" && checkBoxValue.lenght == 0) {
    for (i = 0; i < members.length; i++) {
      if (members[i].state == selectVar) {
        filteredArray.push(members[i])
      }
    }
  } else if (selectVar == "" && checkBoxValue.lenght !== 0) {
    for (i = 0; i < members.length; i++) {
      if (checkBoxValue.includes(members[i].party)) {
        filteredArray.push(members[i])
      }
    }
  } else {
    for (i = 0; i < members.length; i++) {
      if (members[i].state == selectVar && checkBoxValue.includes(members[i].party)) {
        filteredArray.push(members[i])
      }
    }
  }
  createTable(filteredArray);

}



function dropEvent(members) {
  let dropdownEvent = document.getElementById("myDropdown");
  dropdownEvent.addEventListener("click", function () {
    filter(members);

  });
}
// removedDupl and sort

function dropFunct(members) {

  let dropdownArray = [];

  for (let i = 0; i < members.length; i++) {

    let memberState = members[i].state
    dropdownArray.push(memberState)

  }


  let removedDupl = dropdownArray.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);

  let select = document.getElementById("myDropdown");

  for (let i = 0; i < dropdownArray.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = dropdownArray[i]

    select.appendChild(option);
  }
}