import React from "react";

const Projekt = ( { params } ) => {
    return (
        <div className="container">
            <h1>Projekt - {params.projekt}</h1>
        </div>
    )
}
export default Projekt;