var sortData = addData;

// function dataSort() {
//     var sortData = [];
//     members.sort(function (a, b) {
//         return b.votes_with_party_pct - a.votes_with_party_pct;
//     });


// }
// dataSort();



function addData_mostL() {
    for (var i = 0; i < members.length * 0.1; i++) {

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td2.className = "tdstyle-center"
        var td3 = document.createElement("td");
        td3.className = "tdstyle-center"


        var party_votes = (members[i].total_votes * members[i].votes_with_party_pct) / 100;
        var party_votes_round = Math.ceil(party_votes);


        td1.innerHTML =
            (members[i].last_name || "") +
            " " +
            (members[i].first_name || "") +
            " " +
            (members[i].middle_name || "") +
            " ";

        td2.innerHTML = party_votes_round;
        td3.innerHTML = members[i].votes_with_party_pct + " " + "%";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        var tbody = document.getElementById("most_loyal");
        tbody.appendChild(tr);
    }
}

addData_mostL()