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
                    <a href="${driver.url}" style="color: red">
                    <h2 class="driver-name">${driver.givenName} ${driver.familyName}</h2>
                    </a>
                    <p class="driver-details">${driver.dateOfBirth}</p>
                    <span class="driver-nationality">${driver.nationality}</span>
                </div>
            `;
            driversContainer.appendChild(driverCard);
        });

        // Masquer le loader une fois les données chargées
        //loadingElement.style.display = 'none';

    } catch (error) {
        console.error("Erreur lors de la récupération des pilotes:", error);
        /*document.getElementById('loading').innerHTML = `
            <p style="color: #e10600;">Erreur lors du chargement des pilotes. Veuillez réessayer.</p>
            <button onclick="window.location.reload()">Recharger</button>
        `;
        */
    }
});