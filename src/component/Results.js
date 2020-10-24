import React from 'react';
import Result from './Result';

function Results({ results, message }) {
    return (
        <div><h2>{message}</h2>
            <div class="movies">
                {results.map(result => (
                    <Result key={result.name} result={result} />
                ))}
            </div></div>
    )
}

export default Results;