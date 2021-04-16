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

loadEvents()
// computeTotal(eventsBase)
// console.log(computeAverage(eventsBase))
// console.log(computeMax(eventsBase))
// console.log(computeMin(eventsBase))

function loadEvents() {
    let events = [];
    events = getData();
    displayData(events);
    computeStats(events);
}

function getData() {
    let events = JSON.parse(localStorage.getItem("eventArray")) || [];
    if (events.length == 0) {
        events = eventsBase;
        localStorage.setItem("eventArray", JSON.stringify(events));
    }
    buildDropDown(events);
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
    obj["attendance"] = parseInt(document.getElementById("newAttendance").value);
    obj["date"] = document.getElementById("newDate").value;
    // if any fields are blank, fire sweetalert, then return without adding to table.
    if (!obj.event || !obj.city || !obj.state || !obj.attendance || !obj.date ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fill in all form elements please'
        })
        return
    }
    events.push(obj);

    localStorage.setItem("eventArray", JSON.stringify(events));

    displayData(events);
    buildDropDown(events);
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
function computeStats(eventList) {
    let average = computeAverage(eventList)
    let max = computeMax(eventList)
    let min = computeMin(eventList)
    let total = computeTotal(eventList)
    displayStats(average, max, min, total)
}

function displayStats(average, max, min, total) {
    const template = document.getElementById("dataTemplate");
    const statsBody = document.getElementById("statsBody");
    //clear table
    //replace each data with ""(?) then replace with calculated value
    injectData(total.toLocaleString(), "total")
    injectData(average.toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0}), "average")
    injectData(max, "max")
    injectData(min, "min")
}

function injectData(number, id) {
    document.getElementById(id).textContent = number.toLocaleString()
}

function computeTotal(eventList) {
    let total = 0
    for (let i = 0; i < eventList.length; i++) {
        total += eventList[i].attendance;

    }
    return total;
}

function computeAverage(eventList) {
    let total = computeTotal(eventList)
    return total / eventList.length
}

function computeMax(eventList) {
    let max = -1;
    for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].attendance > max) {
            max = eventList[i].attendance
        }

    }
    return max
}

function computeMin(eventList) {
    let min = Infinity;
    for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].attendance < min) {
            min = eventList[i].attendance
        }

    }
    return min
}
// FILTER SECTION
var filteredEvents = eventsBase
function buildDropDown(eventsList){
    var eventDropDown = document.getElementById("eventDropDown")
    // creates a list of ONLY unique cities
    let distinctCities = [...new Set(eventsList.map((event)=>event.city))] 
    // This needs to be changed for a template, divider then link to all

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = ""
    for (let i = 0; i < distinctCities.length; i++) {
        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctCities[i]}">${distinctCities[i]}</a>`;
    }
    resultsHTML += linkHTMLEnd;
    eventDropDown.innerHTML = resultsHTML
}
//FIXME changes filter, calling update functions
function getEvents(element){
    let city = element.getAttribute("data-string")
    let eventList = JSON.parse(localStorage.getItem("eventArray")) || [];
    let filteredList = filterList(eventList,city)
    document.getElementById("statsHeader").innerText = `Event stats for ${city}`
    computeStats(filteredList)
}

function filterList(eventList, cityName) {
    let currentList =[];
    if(cityName != "All"){

        for (let i = 0; i < eventList.length; i++) {
            if(eventList[i].city == cityName){
                currentList.push(eventList[i]); 
            }
        }
    }else{
        return eventList;
    }
    return currentList
}
