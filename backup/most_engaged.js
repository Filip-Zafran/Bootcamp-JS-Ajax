var members = data.results[0].members;

var sortData = addData



function dataSort() {

    var sortData = []
    members.sort(function (a, b) {
        return b.missed_votes - a.missed_votes;
    });
    console.log(members);

}
dataSort()


function addData() {

    for (var i = 0; i < members.length * 0.1; i++) {
        console.log(members[i]);
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td2.className = "tdstyle-center"
        var td3 = document.createElement("td");
        td3.className = "tdstyle-center"


        td1.innerHTML =
            (members[i].last_name || "") +
            " " +
            (members[i].first_name || "") +
            " " +
            (members[i].middle_name || "") +
            " ";

        td2.innerHTML = members[i].missed_votes;
        td3.innerHTML = members[i].missed_votes_pct + " " + "%";


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        var tbody = document.getElementById("most_engaged");
        tbody.appendChild(tr);
    }
}

addData()