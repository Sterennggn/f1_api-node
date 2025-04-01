document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get("https://api.jolpi.ca/ergast/f1/current/constructors/");
        const constructors = response.data.MRData.ConstructorTable.Constructors;

        const constructorsContainer = document.getElementById('constructors-container');

        constructors.forEach((constructor) => {
            const constructorsCard = document.createElement('div');
            constructorsCard.className = 'constructors-card';

            constructorsCard.innerHTML = `
                <div class="constructor-info">
                    <div>
                        <a href="${constructor.url}" style="color: red">
                            <h2 class="constructor-name">${constructor.name}</h2>
                        </a>
                        <span class="constructor-nationality">${constructor.nationality}</span>
                    </div>
                    <div>
                        <img class="constructor-portrait" src="constructors_photos/${constructor.name.toLowerCase().replace(/\s+/g, '_')}.png" alt=""/>
                    </div>
                </div>
            `;
            constructorsContainer.appendChild(constructorsCard);
        });


    } catch (error) {
        console.error("Erreur lors de la récupération des écuries : ", error);
    }
});
