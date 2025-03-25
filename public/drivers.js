const response = await axios.get("https://api.jolpi.ca/ergast/f1/drivers/");
const drivers = response.data.MRData.DriverTable.Drivers;

let driverList = document.createElement("ul");

drivers.forEach((driver) => {
    driverList.innerHTML += `<li>${driver.givenName} ${driver.familyName} - ${driver.nationality} - ${driver.dateOfBirth}</li>`;
});

document.body.appendChild(driverList); // Ajout à la page