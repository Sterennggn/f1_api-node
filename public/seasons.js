const axios = require("axios");
const response = await axios.get("https://ergast.com/api/f1/seasons.json?limit=200");

const seasons = response.data.MRData.SeasonTable.Seasons;
let seasonList = "<h1>Saisons disponibles</h1><ul>";
seasons.forEach((season) => {
    seasonList += `<li>${season.season} (<a href="${season.url}" target="_blank">DÃ©tails</a>)</li>`;
});
seasonList += "</ul><a href='/public'>Retour au menu</a>";
res.send(seasonList);