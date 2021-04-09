const Data = require('../../models/datalogger');
const csvParser = require('csv-parser');
const fs = require('fs');

const csvHeaders = {
    'Sub-Sample No.': "Sub-Sample_No",
    'Gas Sample No.': "Gas_Sample_No",
    'Significant Measure': "Significant_Measure",
    'CPU Time': "CPU_Time",
    'Date/Time (EST)': "Date",
    'Fluid Temp (C)': "Fluid_Temp",
    'Fluid pH': "Fluid_pH",
    'Gas Temp (C)': "Gas_Temp",
    'Gas RH%': "Gas_RH",
    'Gas Pressure (hPa)': "Gas_Pressure",
    'Gas MQ4 (Volts/5.0)': "Gas_MQ4",
    'Gas MQ135 (Volts/5.0)': "Gas_MQ135",
    'Dry fail': "Dry_fail"
};

const parseCsvToDatabase = function(csvFile) {
    fs.createReadStream(csvFile)
    .pipe(csvParser(Object.values(csvHeaders)))
    .on('data', (data) => Data.create(data))
    .on('end', () => console.log('finished'));
}

module.exports.parseCsvToDatabase = parseCsvToDatabase;
