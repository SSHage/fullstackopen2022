import React from "react";
import Weather from "./Weather";

const DisplaySingle = ({country}) => {

    const languages = country.languages
    const language = []

    for (const lang in languages) {
        language.push(<li key={language.length+1}>{languages[lang]}</li>)
    } //create list of languages using the country languages object

    return(
        <div>
            <h1>
                {country.name.official}
            </h1>
            <div>
                Capital: {country.capital}
            </div>
            <div>
                Area: {country.area}
            </div>
            <h2>
                Languages:
            </h2>
            <div>
                {language}
            </div>
            <img src = {country.flags.png} alt = 'country's flag />
            <Weather city = {country.capital}/>
        </div>
    )
}

export default DisplaySingle