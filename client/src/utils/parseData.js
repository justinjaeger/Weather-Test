module.exports = (data) => {
  const days = [];

  // Initialize a day object
  let day = {
    date: new Date(data[0].dt*1000).toString().slice(0,15),
    precipitation: [],
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
  };

  // Reset Day Function
  const resetDay = (currentDate) => {

    // calculate overall precipitation
    const averagePrecip = day.precipitation.reduce((a,b) => (a+b)) / day.precipitation.length;
    day.precipitation = Math.round(averagePrecip*100) / 100;

    // convert kelvin to fahrenheit
    day.min = Math.round((day.min - 273.15) * (9/5) + 32)
    day.max = Math.round((day.max - 273.15) * (9/5) + 32)

    // push a shallow copy of current day object to days array
    days.push(Object.assign({}, day));

    // reset day object
    day.date = currentDate;
    day.precipitation = [];
    day.min = Number.POSITIVE_INFINITY;
    day.max = Number.NEGATIVE_INFINITY;
  };

  // Iterate through data
  data.forEach(threeHourPeriod => {


    // if encountering a new date, reset day
    const currentDate = new Date(threeHourPeriod.dt*1000).toString().slice(0,15);
    if (day.date !== currentDate) resetDay(currentDate);

    // Reassign day values
    day.min = Math.min(day.min, threeHourPeriod.main.temp_min);
    day.max = Math.max(day.max, threeHourPeriod.main.temp_min);
    day.precipitation.push(threeHourPeriod.pop);
  });
  // push last day
  resetDay();

  return days;
};