let eventsBase = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
]

loadEvents();

function loadEvents() {
    let events = [];
    events = getData();
    displayData(events);
}

function getData() {
    let events = JSON.parse(localStorage.getItem("eventArray")) || [];
    if (events.length == 0) {
        events = eventsBase;
        localStorage.setItem("eventArray", JSON.stringify(events));
    }
    return events;
}

function saveEvent() {
    //grab the events out of localstorage
    let events = JSON.parse(localStorage.getItem("eventArray")) || eventArray;
    // todo Check for empty inputs
    
    //Access values from the form by ID and add objecct to the array
    let obj = {};
    obj["event"] = document.getElementById("newEvent").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = document.getElementById("newAttendance").value;
    obj["date"] = document.getElementById("newDate").value;
    // if any fields are blank, fire sweetalert, then return without adding to table.
    if (!obj.event || !obj.city || !obj.state || !obj.attendance || !obj.date ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Fill in all forms.'
        })
        return
    }
    events.push(obj);

    localStorage.setItem("eventArray", JSON.stringify(events));

    displayData(events);

}

function displayData(events) {
    const template = document.getElementById("dataTemplate");
    const resultsBody = document.getElementById("resultsBody");
    //clear table
    resultsBody.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("event").textContent = events[i].event;
        dataRow.getElementById("city").textContent = events[i].city;
        dataRow.getElementById("state").textContent = events[i].state;
        dataRow.getElementById("attendance").textContent = events[i].attendance;
        dataRow.getElementById("date").textContent = formatDate(events[i].date);

        resultsBody.appendChild(dataRow);
    }
}

function formatDate(dateString) {
    newDate = new Date(dateString);
    let resDate = ""
    resDate+= newDate.getMonth()
    resDate+= "/"
    resDate+= newDate.getDay()
    resDate+= "/"
    resDate+= newDate.getFullYear()
    return resDate
}
