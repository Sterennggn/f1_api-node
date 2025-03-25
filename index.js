const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Route principale
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route pour afficher la liste des pilotes
app.get("/drivers", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "public", "drivers.html"));
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des pilotes");
    }
});

// Route pour afficher la liste des écuries
app.get("/constructors", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "public", "constructors.html"));
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des écuries");
    }
});

// Route pour afficher les saisons disponibles
app.get("/seasons", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "public", "seasons.html"));
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des saisons");
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});