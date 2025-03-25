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