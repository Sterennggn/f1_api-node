try {
    const response = await axios.get("https://api.jolpi.ca/ergast/f1/2025/races/");
    const races = response.data.MRData.RaceTable.Races;

    const container = document.getElementById('race-container');

    // Tri des courses par round (dans l'ordre)
    const sortedRaces = races.sort((a, b) => a.round - b.round);

    for (const race of sortedRaces) {
        const raceDate = new Date(race.date);
        const today = new Date();
        const isFutureRace = raceDate > today;

        const raceCard = document.createElement('div');
        raceCard.className = 'race-card';

        // Informations principales sur les courses
        raceCard.innerHTML = `
            <div class="race-info">
                <div>
                    <a href="${race.url}" class="home-link">
                        <h2 class="race-name">${race.raceName}</h2>
                    </a>
                    <p class="race-details">📍 ${race.Circuit.circuitName} - ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</p>
                    <p class="race-details">📅 ${race.date}</p>
                    ${isFutureRace ? `<div class="race-futur">À venir</div>` : ''}
                </div>
            </div>
        `;

        // Ajouter les informations sur le sprint si disponibles
        if (race.Sprint) {
            const sprintDate = new Date(`${race.Sprint.date}T${race.Sprint.time}`);
            raceCard.innerHTML += `
                <div class="sprint-info">
                    <div>⚡ <strong>Sprint :</strong> ${sprintDate.toLocaleString()}</div>
                </div>
            `;
        } else {
            raceCard.innerHTML += `<div class="sprint-info"></div>`;
        }

        if (race.SprintQualifying || race.SprintShootout) {
            const sprintQ = race.SprintQualifying || race.SprintShootout;
            const sprintQualiDate = new Date(`${sprintQ.date}T${sprintQ.time}`);
            raceCard.innerHTML += `
                <div class="sprint-qualifying-info">
                    <div>🎯 Qualification Sprint : ${sprintQualiDate.toLocaleString()}</div>
                </div>
            `;
        } else {
            raceCard.innerHTML += `<div class="sprint-qualifying-info"></div>`;
        }

        // Afficher les résultats si la course est passée
        if (!isFutureRace) {
            try {
                const resultRes = await axios.get(`https://api.jolpi.ca/ergast/f1/2025/${race.round}/results.json`);
                const results = resultRes.data.MRData.RaceTable.Races[0]?.Results;

                if (results) {
                    const podium = results.slice(0, 3).map((res, idx) => `
                        <li>#${idx + 1}: ${res.Driver.givenName} ${res.Driver.familyName} (${res.Constructor.name})</li>
                    `).join('');

                    raceCard.innerHTML += `
                        <div class="results-info">
                            <div>
                                <h4>🏁 Résultats :</h4>
                                <ul>${podium}</ul>
                            </div>
                        </div>
                    `;
                } else {
                    raceCard.innerHTML += `<div class="results-info"></div>`;
                }
            } catch (err) {
                console.warn(`Pas de résultats pour ${race.raceName}`);
                raceCard.innerHTML += `<div class="results-info"></div>`;
            }
        } else {
            raceCard.innerHTML += `<div class="results-info"></div>`;
        }
        container.appendChild(raceCard);
    }
} catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
}
