google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(setupCharts);

window.addEventListener('resize', setupCharts, false); // Re-render charts on window resize

const thursday = [
    [ "Truth Stage", "New York Brass Band & Friends", thurs(15, 0), thurs(16, 0) ],
    [ "Gateway", "Mik Artistik's Ego Trip", thurs(16, 35), thurs(17, 35) ],
    [ "Gateway", "Lekiddo", thurs(17, 40), thurs(18, 10) ],
    [ "William's Green", "Michael Eavis & Band", thurs(18, 45), thurs(19, 20) ],
    [ "William's Green", "TBA", thurs(19, 45), thurs(20, 25) ],
    [ "William's Green", "Elvana", thurs(21, 10), thurs(22, 10) ],
    [ "Rabbit Hole", "Four Tet", fri(00, 00), fri(01, 30) ],
    [ "Glade", "Camelphat", fri(00, 25), fri(02, 25) ],
]

function setupCharts() {
    drawChart("thursday", thursday)
    drawChart("friday", thursday)
    drawChart("saturday", thursday)
    drawChart("sunday", thursday)
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

    const stages = new Set(acts.map(arr => arr[0]))
    const rowHeight = 51

    var options = {
        timeline: { colorByRowLabel: true }, // Colour by stage
        chartArea: {
        height: "100%",
        width: "100%",
        },
        height: stages.size * rowHeight,
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

function time(day, hour, min) {
    return new Date(2022, 1, day, hour, min)
}