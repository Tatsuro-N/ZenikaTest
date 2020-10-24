import React from 'react';

import {
    Link
} from "react-router-dom";

function Result({ result }) {
    return (
        <div class="movie">
            <Link to={"/Details/" + result.name}>
                <img class="movie-poster" alt={"Poster for " + result.name} src={require("../assets/" + result.image)} />
                <h3>{result.name}</h3>
            </Link>
        </div>
    )
}

export default Result;