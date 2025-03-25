const response = await axios.get("https://api.jolpi.ca/ergast/f1/current/drivers/");
const drivers = response.data.MRData.DriverTable.Drivers;

let driverList = document.createElement("ul");

drivers.forEach((driver) => {
    driverList.innerHTML += `<li>${driver.givenName} ${driver.familyName} - ${driver.nationality} - ${driver.dateOfBirth}</li>`;
});

let footer = document.createElement("footer");
footer.innerHTML += `<a href='/'>Retour au menu</a>`;
document.body.appendChild(driverList);
document.body.appendChild(footer);