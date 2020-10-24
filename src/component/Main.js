import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

import Filter from './Filter';
import Results from './Results';

function Main() {
    const apiUrl = "https://sometimes-maybe-flaky-api.gdshive.io/";

    const [state, setState] = useState({
        filterBy: "",
        filter: "",
        message: "Getting movies info, please wait",
        results: [],
        selected: {},
        genre: [],
        year: []
    })

    const filter = (e) => {
        setState(prevState => {
            return { ...prevState, message: "Getting movies info, please wait" }
        });
        let filterValue = e.target.value;
        getData(state.filterBy, filterValue);
    }

    const handleFilter = (e) => {
        let filterBy = e.target.value;

        setState(prevState => {
            return { ...prevState, filterBy: filterBy }
        });
    }

    const getData = async (filterBy, filterValue) => {
        try {
            let res = await axios.get(apiUrl);
            var genre = [];
            var year = [];
            var results = [];
            for (var row of res.data) {
                if (genre.indexOf(row.genre) === -1) {
                    genre.push(row.genre);
                }
                if (year.indexOf(row.productionYear) === -1) {
                    year.push(row.productionYear);
                }
            }

            genre.sort();
            year.sort();

            if (filterBy === "productionYear") {
                for (var row of res.data) {
                    if (row.productionYear == filterValue) {
                        results.push(row);
                    }
                }
                setState(prevState => {
                    return {
                        ...prevState,
                        results: results,
                        filterValue: filterValue,
                        message: ""
                    }
                })
            }
            else if (filterBy === "genre") {
                for (var row of res.data) {
                    if (row.genre === filterValue) {
                        results.push(row);
                    }
                }
                setState(prevState => {
                    return {
                        ...prevState,
                        results: results,
                        filterValue: filterValue,
                        message: ""
                    }
                })
            }
            else {
                results = res.data
                setState({
                    results: results,
                    genre: genre,
                    year: year,
                    message: ""
                })
            }
        } catch (e) {
            getData(filterBy, filterValue);
        }
    }

    useEffect(() => {
        if (state.results.length == 0) {
            getData();
        }
    })

    return (
        <div className="App">
            <header className="App-header">
                <h1>Movies</h1>
            </header>
            <Filter handleFilter={handleFilter} filterBy={state.filterBy} filter={filter} years={state.year} genres={state.genre}></Filter>
            <Results results={state.results} message={state.message} />
        </div>
    );
}

export default Main;
