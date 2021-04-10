chartGraph();
    
async function chartGraph() {
    const data = await getDataDB();
    const ctx = document.getElementById('myChart').getContext('2d');
    const chartData = {
        labels: data.xs,
        datasets: [{
            label: 'Gas Temp',
            data: data.ys,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    }
    const chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: false
        }
    });

    updateChartType(chart, ctx, chartData);
}

async function getDataCSV() {

    const xs = [];
    const ys = [];

    const response = await fetch('csvfiles/SOFIE_FTP_CSV_Log_Day_252.csv');
    const data = await response.text();
    console.log(data);

    const table = data.split('\n').slice(3);
    table.forEach(row => {
        const columns = row.split(',');
        const timestamp = columns[0];
        xs.push(timestamp);
        const dataloggerPanelTemp = columns[4];
        ys.push(dataloggerPanelTemp);
        console.log(columns);
    });
    return {
        xs,
        ys
    };
}

async function getDataDB() {
    const response = await fetch('/data').then(res => {
        return res.json();
    });
    
    return response;
}

function updateChartType(chart, ctx, chartData) {  
    const chartType = document.getElementById("chartType");
    chartType.addEventListener('change', function() {
        chart.destroy();
        chart = new Chart(ctx, {
            type: document.getElementById("chartType").value,
            data: chartData,
            options: {
                responsive: false
            }
        });
    });
}
