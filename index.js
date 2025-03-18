const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware pour servir des fichiers statiques (si besoin)
app.use(express.static("public"));

// Route principale
app.get("/", (req, res) => {
    res.send(`
    <h1>Bienvenue dans l'Application Formula 1</h1>
    <p> Ici vous retrouverez toutes les informations concernant les pilotes, les écuries et les différentes saisons de formule 1 !</p>
    <ul>
      <li><a href="/drivers">Liste des pilotes</a></li>
      <li><a href="/constructors">Liste des écuries</a></li>
      <li><a href="/seasons">Saisons disponibles</a></li>
    </ul>
  `);
});

// Route pour afficher la liste des pilotes
app.get("/drivers", async (req, res) => {
    try {
        const response = await axios.get("https://ergast.com/api/f1/drivers.json?limit=200");
        const drivers = response.data.MRData.DriverTable.Drivers;
        let driverList = "<h1>Liste des pilotes</h1><ul>";
        drivers.forEach((driver) => {
            driverList += `<li>${driver.givenName} ${driver.familyName} (${driver.nationality})</li>`;
        });
        driverList += "</ul><a href='/'>Retour au menu</a>";
        res.send(driverList);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des pilotes");
    }
});

// Route pour afficher la liste des écuries
app.get("/constructors", async (req, res) => {
    try {
        const response = await axios.get("https://ergast.com/api/f1/constructors.json?limit=200");
        const constructors = response.data.MRData.ConstructorTable.Constructors;
        let constructorList = "<h1>Liste des écuries</h1><ul>";
        constructors.forEach((constructor) => {
            constructorList += `<li>${constructor.name} (${constructor.nationality})</li>`;
        });
        constructorList += "</ul><a href='/'>Retour au menu</a>";
        res.send(constructorList);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des écuries");
    }
});

// Route pour afficher les saisons disponibles
app.get("/seasons", async (req, res) => {
    try {
        const response = await axios.get("https://ergast.com/api/f1/seasons.json?limit=200");
        const seasons = response.data.MRData.SeasonTable.Seasons;
        let seasonList = "<h1>Saisons disponibles</h1><ul>";
        seasons.forEach((season) => {
            seasonList += `<li>${season.season} (<a href="${season.url}" target="_blank">Détails</a>)</li>`;
        });
        seasonList += "</ul><a href='/'>Retour au menu</a>";
        res.send(seasonList);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des saisons");
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
