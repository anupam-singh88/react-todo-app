import NoteContext from "./noteContext";

import React from 'react'

export default function NoteState(props) {
    const getLocal = () => {
        let arr = localStorage.getItem('notes');
        if (arr) {
            return JSON.parse(arr)
        }
        else {
            return [];
        }
    }
    return (
        <div>
            <NoteContext.Provider value={{ getLocal }}>
                {props.children}
            </NoteContext.Provider>
        </div>
    )
}
