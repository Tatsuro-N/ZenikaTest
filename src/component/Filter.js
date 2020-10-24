import React from 'react';

function Filter({handleFilter, filterBy, filter, years, genres}){
    let options=[];
    if(filterBy=="productionYear"){
        options.push(<option disabled selected hidden>Value</option>)
        years.map((year)=>{
                options.push(<option value={year}>{year}</option>)
        })
    }
    else if(filterBy=="genre"){
        options.push(<option disabled selected hidden>Value</option>)
        genres.map((genre)=>{
            options.push(<option value={genre}>{genre}</option>)
        })
    }
    else{
        options.push(<option disabled selected hidden>Value</option>)
    }
    return(
        <div>
            <select onChange={handleFilter}>
                <option disabled selected hidden>Filter By</option>
                <option value="productionYear">Production Year</option>
                <option value="genre">Genre</option>
            </select>

            <select onChange={filter}>
                {options}
            </select>
        </div>
    )
}

export default Filter;