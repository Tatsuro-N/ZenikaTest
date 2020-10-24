import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import '../App.css';


function Details() {

    var params = useParams();
    const apiUrl = "https://sometimes-maybe-flaky-api.gdshive.io/";

    const [state, setState] = useState({
        message: "Getting movies info, please wait",
        results: [],
        shortSynopsis: true
    })

    const getData = async () => {
        try {
            let res = await axios.get(apiUrl);
            for (var row of res.data) {
                if (row.name === params.name) {
                    setState(prevState => {
                        return { ...prevState, results: row, message: "" }
                    });
                }
            }
        } catch (e) {
            getData();
        }
    }

    useEffect(() => {
        if (state.results.length == 0) {
            getData();
        }
    })

    function toggleLongShort() {
        setState(prevState => {
            return {
                ...prevState,
                shortSynopsis: !state.shortSynopsis
            }
        })
    }
    var img;
    if (typeof (state.results.image) !== 'undefined') {
        img = <img alt={"Poster for " + state.results.name} src={require("../assets/" + state.results.image)} />;
    }
    var synopsisShort = <p class="synopsis">{ReactHtmlParser(state.results.synopsisShort)}</p>;
    var synopsis = <p class="synopsis">{ReactHtmlParser(state.results.synopsis)}</p>;
    var link = <button onClick={toggleLongShort}>Click for short synopsis</button>;
    var linkShort = <button onClick={toggleLongShort}>Click for full synopsis</button>;
    return (
        <div>
            {state.message == "" ?
                <div class="details">
                    {img}
                    <div>
                        <h2>{state.results.name}</h2>
                        <h4>Production Year: {state.results.productionYear}</h4>
                        <h4>Genre: {state.results.genre}</h4>
                        <h4>Synopsis:</h4>
                        {state.shortSynopsis ? synopsisShort : synopsis}
                        {state.shortSynopsis ? linkShort : link}
                    </div>
                </div> : 
                <h2>{state.message}</h2>
            }
        </div >
    );
}

export default Details;