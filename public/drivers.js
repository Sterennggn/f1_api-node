document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get("https://api.jolpi.ca/ergast/f1/current/drivers/");
        const drivers = response.data.MRData.DriverTable.Drivers;

        //const loadingElement = document.getElementById('loading');
        const driversContainer = document.getElementById('drivers-container');

        // Création des cartes de pilotes
        drivers.forEach((driver) => {
            const driverCard = document.createElement('div');
            driverCard.className = 'driver-card';

            driverCard.innerHTML = `
                <div class="driver-info">
                    <div class="">
                        <a href="${driver.url}" style="color: red">
                        <h2 class="driver-name">${driver.givenName} ${driver.familyName}</h2>
                        </a>
                        <p class="driver-details">${driver.dateOfBirth}</p>
                        <span class="driver-nationality">${driver.nationality}</span>
                    </div>
                    <div>
                        <img class="driver-portrait" src="pilotes_photos/${driver.givenName.toLowerCase()}-${driver.familyName.toLowerCase()}.png" alt=""/>
                    </div>
                </div>
            `;
            driversContainer.appendChild(driverCard);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des pilotes:", error);
    }
});