// Import Axios >> eerst in terminal npm install axios doen
import axios from "axios";

// Add html element
const countryList = document.querySelector("#countries-list");

// Function color of country
const colorCountry = function(arr) {
    switch (arr.region) {
        case "Asia":
            return "red";
            break;
        case "Africa":
            return "blue";
            break;
        case "Americas":
            return "green";
            break;
        case "Europe":
            return "yellow";
            break;
        case "Oceania":
            return "purple";
            break;
        default:
            return "grey";
            break;
    }
}

// Function sort population
const sortPopulation = function(arr) {
    const sortItem = arr.concat().sort((a, b) => {
        return a.population - b.population;
    });
    return sortItem;
}

// Function creating list
const createListItem = function (arr) {
    const newItem = arr.map((country) => {
        // Creating items
        let listItem = document.createElement("li");
        let listContainer = document.createElement("div");
        let countryFlag = document.createElement("img");
        let countryName = document.createElement("h2");
        let countryPopulation = document.createElement("p");

        // Link data to the items
        countryFlag.src = country.flags.png;
        countryName.textContent = country.name;
        countryPopulation.textContent = `Has a population of ${country.population} people`;

        // Link style classes to the items
        countryFlag.classList.add("list-img");
        listContainer.classList.add("list-style");
        countryName.classList.add(colorCountry(country));

        // Make a list item
        listContainer.appendChild(countryFlag);
        listContainer.appendChild(countryName);
        listItem.appendChild(listContainer);
        listItem.appendChild(countryPopulation);

        countryList.appendChild(listItem);
    });
}

// Add data from api
async function fetchCountries() {
    try {
        //  Get request
        const result = await axios.get("https://restcountries.com/v2/all");

        //  Example console
        console.log(result.data[3]);
        console.log(result.data[0].name);

        // Sort result on population
        const sortedArray = sortPopulation(result.data);

        // Create html elements with sorted array
        createListItem(sortedArray);

        // Add colors to list items based on region
        colorCountry(result.data);
    } catch (e) {
        console.log(e);
    }
}

fetchCountries();


