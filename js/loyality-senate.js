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
            let data = result.results[0].members;
            addDataLL(data);
            addDataML(data);

            countMembers(data);


            calculateAverage(republicans, "Rep");
            calculateAverage(democrats, "Dem");
            calculateAverage(independents, "Ind");
            createTable("Democrats");
            createTable("Republicans");
            createTable("Independents");
            createTable("Total");

            removeNull()


        })
        .catch(error => console.log(error))

}
fetchData()



function addDataLL(members) {

    members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });


    for (var i = 0; i < members.length * 0.1; i++) {

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


        td2.innerHTML = members[i].total_votes;
        td3.innerHTML = members[i].votes_with_party_pct + " " + "%";


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        var tbody = document.getElementById("least_loyal");
        tbody.appendChild(tr);
    }
}

function addDataML(members) {
    members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });



    for (var i = 0; i < members.length * 0.1; i++) {

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

        td2.innerHTML = members[i].total_votes;
        td3.innerHTML = members[i].votes_with_party_pct + " " + "%";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        var tbody = document.getElementById("most_loyal");
        tbody.appendChild(tr);
    }
}

var statistics = {

    countD: 0,
    countR: 0,
    countI: 0,
    countT: 0,

    averageD: 0,
    averageR: 0,
    averageI: 0,
    averageT: 0,
};

var republicans = [];
var democrats = [];
var independents = [];


function countMembers(members) {

    for (var i = 0; i < members.length; i++) {
        if (members[i].party === "R") {
            republicans.push(members[i]);
        } else if (members[i].party === "D") {
            democrats.push(members[i]);
        } else {
            independents.push(members[i]);
        }
    }
    statistics.countR = republicans.length;
    statistics.countD = democrats.length;
    statistics.countI = independents.length;
    statistics.countT = republicans.length + democrats.length + independents.length;
}


function calculateAverage(array, target) {
    var percSum = 0;
    for (var i = 0; i < array.length; i++) {
        percSum = percSum + array[i].votes_with_party_pct;
    }
    var average = percSum / array.length;


    if (target === "Rep") {
        if (statistics.averageR === isNaN) {
            statistics.averageR = 0;
        } else {
            statistics.averageR = roundToTwo(average);
        }
    } else if (target === "Dem") {
        if (statistics.averageD === isNaN) {
            statistics.averageD = 0;
        } else {
            statistics.averageD = roundToTwo(average);
        }
    } else {
        if (statistics.averageI === isNaN) {
            statistics.averageI = 0
        }
    }

    statistics.averageT =
        (statistics.averageD + statistics.averageR + statistics.averageI) / 3;
    statistics.averageT = roundToTwo(statistics.averageT);

}

function roundToTwo(value) {
    return +(Math.round(value + "e+2") + "e-2");
}



function createTable(target) {
    var atGlance = document.getElementById("at-glance");
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td2.className = "tdstyle-center"
    var td3 = document.createElement("td");
    td3.className = "tdstyle-center"


    td1.innerHTML = target;
    if (target === "Democrats") {
        td2.innerHTML = statistics.countD;
        td3.innerHTML = statistics.averageD + " " + "%";
    } else if (target === "Republicans") {
        td2.innerHTML = statistics.countR;
        td3.innerHTML = statistics.averageR + " " + "%";
    } else if (target === "Independents") {
        td2.innerHTML = statistics.countI;
        td3.innerHTML = statistics.averageI + " " + "%";
    } else {
        td2.innerHTML = statistics.countT;
        td3.innerHTML = statistics.averageT + " " + "%";
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);


    atGlance.appendChild(tr);
}