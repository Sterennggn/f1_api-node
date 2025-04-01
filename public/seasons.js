const response = await axios.get("https://api.jolpi.ca/ergast/f1/current/seasons/");
const seasons = response.data.MRData.SeasonTable.Seasons;

let seasonList = document.createElement("ul")
seasons.forEach((season) => {
    seasonList += `<li>${season.season}</li>`;
});
let footer = document.createElement("footer");
footer.innerHTML += `<a href='/'>Retour au menu</a>`;
document.body.appendChild(seasonList);
document.body.appendChild(footer);

// calendrier des courses (trouver si l'api le permet ou en trouver une autre sinon), et résultats déjà connus
// pilotes qui ont au moins gagnés un championnats et qui font partis de la saisons 2025 avec la date de leur win
