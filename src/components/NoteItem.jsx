import React from 'react'

export default function NoteItem(props) {
    // console.log(props.note)
    return (
        <>
            <div className="notes">
                <p className="noteTitle">{props.note.title}</p>
                <i className="fa-regular fa-pen-to-square fa-2xs" style={{ color: "#46c22e", marginRight: '15px' }}
                    onClick={() => {
                        props.editNote(props.note.id)
                        // console.log(props.note.id)
                    }} ></i>
                <i className="fa-solid fa-trash fa-2xs" style={{ color: "red" }} onClick={() => {
                    props.deleteNote(props.note.id)
                    // console.log(props.note.id)

                }}></i>
            </div>
        </>
    )
}
