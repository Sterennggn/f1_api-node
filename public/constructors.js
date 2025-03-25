const response = await axios.get("https://api.jolpi.ca/ergast/f1/current/constructors/");
const constructors = response.data.MRData.ConstructorTable.Constructors;

let constructorList = document.createElement("ul");
constructors.forEach((constructor) => {
    constructorList.innerHTML += `<li>${constructor.name} (${constructor.nationality})</li>`;
});
let footer = document.createElement("footer");
footer.innerHTML += `<a href='/'>Retour au menu</a>`;
document.body.appendChild(constructorList);
document.body.appendChild(footer);