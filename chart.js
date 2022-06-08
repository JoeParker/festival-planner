google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(setupCharts);

window.addEventListener('resize', setupCharts, false); // Re-render charts on window resize

// Data
const thursday = [
    [ "Greenpeace", "Power Ballad Yoga", thurs(10, 0), thurs(11, 0) ],
    [ "Truth Stage", "New York Brass Band & Friends", thurs(15, 0), thurs(16, 0) ],
    [ "Gateway", "Mik Artistik's Ego Trip", thurs(16, 35), thurs(17, 35) ],
    [ "Gateway", "Lekiddo", thurs(17, 40), thurs(18, 10) ],
    [ "William's Green", "Michael Eavis & Band", thurs(18, 45), thurs(19, 20) ],
    [ "William's Green", "TBA", thurs(19, 45), thurs(20, 25) ],
    [ "William's Green", "Elvana", thurs(21, 10), thurs(22, 10) ],
    [ "Rabbit Hole", "Four Tet", fri(00, 00), fri(01, 30) ],
    [ "Glade", "Camelphat", fri(00, 25), fri(02, 25) ],
]
const friday = [
    [ "Greenpeace", "Power Ballad Yoga", fri(10, 0), fri(11, 0) ],
    [ "Other Stage", "The Libertines", fri(11, 30), fri(12, 30) ],
    [ "The Park", "Wet Leg", fri(14, 00), fri(14, 45) ],
    [ "Other Stage", "Blossoms", fri(14, 15), fri(15, 15) ],
    [ "Other Stage", "First Aid Kit", fri(15, 45), fri(16, 45) ],
    [ "Pyramid", "Wolf Alice", fri(16, 45), fri(17, 45) ],
    [ "Other Stage", "IDLES", fri(18, 45), fri(19, 45) ],
    [ "Greenpeace", "She Drew The Gun", fri(20, 45), fri(21, 45) ],
    [ "Other Stage", "Foals", fri(22, 30), fri(23, 45) ],
    [ "Arcadia", "TBA", fri(23, 00), sat(01, 00) ],
    [ "Arcadia", "TBA", sat(01, 00), sat(02, 00) ],
    [ "Arcadia", "Carl Cox B2B Chase & Status", sat(02, 00), sat(03, 00) ],
    // [ "The Temple", "My Nu Leng B2B Wonka", sat(04, 30), sat(06, 00) ],
]
const saturday = [
    [ "Greenpeace", "Power Ballad Yoga", sat(10, 0), sat(11, 0) ],
    [ "Juggling Tent", "Laughter Yoga Workshop", sat(11, 0), sat(12, 0) ],
    [ "West Holts", "Brass Against", sat(13, 15), sat(14, 15) ],
    [ "Pyramid", "Easy Life", sat(14, 30), sat(15, 30) ],
    [ "West Holts", "Black Midi", sat(14, 45), sat(15, 45) ],
    [ "Avalon", "Molotov Jukebox", sat(15, 35), sat(16, 35) ],
    [ "John Peel", "Beabadoobee", sat(16, 30), sat(17, 30) ],
    [ "Greenpeace", "Easy Life", sat(18, 35), sat(19, 30) ],
    [ "Greenpeace", "Fleetmac Wood", sat(19, 30), sat(20, 45) ],
    [ "West Holts", "Avalanches", sat(19, 45), sat(20, 45) ],
    [ "Pyramid", "Paul McCartney", sat(21, 30), sat(23, 45) ],
    [ "Arcadia", "Four Tet", sun(00, 00), sun(01, 00) ],
    [ "Arcadia", "Calvin Harris", sun(01, 00), sun(02, 00) ],
    [ "Arcadia", "Camelphat B2B Patrick Topping", sun(02, 00), sun(03, 00) ],
]
const sunday = [
    [ "Pyramid", "Black Dyke Band", sun(11, 30), sun(12, 15) ],
    [ "Croissant Neuf", "Moulettes", sun(13, 00), sun(14, 00) ],
    [ "Pyramid", "Herbie Hancock", sun(14, 00), sun(15, 00) ],
    [ "John Peel", "TBC", sun(14, 00), sun(15, 00) ],
    [ "Pyramid", "Diana Ross", sun(16, 00), sun(17, 15) ],
    [ "West Holts", "Snarky Puppy", sun(17, 00), sun(18, 00) ],
    [ "The Park", "TBC", sun(18, 15), sun(19, 15) ],
    [ "Avalon", "McFly", sun(18, 20), sun(19, 20) ],
    [ "John Peel", "Little Dragon", sun(20, 00), sun(21, 00) ],
    [ "Other Stage", "Pet Shop Boys", sun(21, 45), sun(23, 15) ],
    [ "Arcadia", "Sub Focus B2B Dimension", mon(00, 30), mon(01, 30) ],
]

// Render

function setupCharts() {
    drawChart("thursday", thursday)
    drawChart("friday", friday)
    drawChart("saturday", saturday)
    drawChart("sunday", sunday)
}

function drawChart(id, acts) {
    var container = document.getElementById(id);
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'Stage' });
    dataTable.addColumn({ type: 'string', id: 'Artist' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    dataTable.addRows(acts);

    const STAGE_COUNT = new Set(acts.map(arr => arr[0])).size
    const ROW_HEIGHT = 41
    const PADDING = 50

    var options = {
        timeline: { 
            colorByRowLabel: true, // Colour by stage
        }, 
        chartArea: {
            height: "100%",
            width: "100%",
        },
        height: STAGE_COUNT * ROW_HEIGHT + PADDING,
    };

    chart.draw(dataTable, options);
}

// Convenience funcs

function thurs(hour, min) {
    return time(1, hour, min)
}

function fri(hour, min) {
    return time(2, hour, min)
}

function sat(hour, min) {
    return time(3, hour, min)
}

function sun(hour, min) {
    return time(4, hour, min)
}

function mon(hour, min) {
    return time(5, hour, min)
}

function time(day, hour, min) {
    return new Date(2022, 1, day, hour, min)
}