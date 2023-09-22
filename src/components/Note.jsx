import React, { useContext, useEffect, useState } from 'react'
import NoteItem from './NoteItem'
import noteContext from '../context/noteContext';

export default function Note() {
    const { getLocal } = useContext(noteContext);
    const [note, setNote] = useState('');
    const [notesArr, setNotesArr] = useState(getLocal())
    const [editBtn, setEditBtn] = useState(null)
    const [editedItem, setEditedItem] = useState(null);

    const onChangeHandler = (e) => {
        setNote(e.target.value)
    }

    const saveToLocal = () => {
        localStorage.setItem('notes', JSON.stringify([...notesArr]));
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (note == '') {
            alert('Kindly Add Note !!!');
            return false
        } else if (note && editBtn) {
            setNotesArr(notesArr.map((elm) => {
                if (elm.id === editedItem) {
                    return { ...elm, title: note }
                }
                return elm
            }))
            setNote('')
            setEditBtn(false)

        } else {


            const inputData = {
                id: new Date().getTime(),
                title: note,
            }
            setNotesArr([...notesArr, inputData]);
            setNote('')
        }
    }
    const editNote = (id) => {
        setEditBtn(true)
        let editItem = notesArr.find((elm) => {
            return elm.id === id
        })
        setNote(editItem.title)
        setEditedItem(id);
    }
    const deleteNote = (id) => {
        const deleteNote = notesArr.filter((elm) => {
            return elm.id !== id
        })
        setNotesArr(deleteNote)

    }
    // console.log(note);
    useEffect(() => {
        saveToLocal();
    }, [notesArr])

    return (
        <>
            <div className="noteContainer">
                <p className='heading'>Todo List</p>
                {/* <br /> */}
                <div className="search">
                    <form onSubmit={onSubmitHandler}>
                        <input type="text" name="noteInp" id="noteInp" className='inp' placeholder='Add Notes' value={note} style={{ width: '100%' }} onChange={onChangeHandler} />

                        {
                            editBtn ? <input type='submit' className='inp' id="addBtn" value={'Edit'} /> : <input type='submit' className='inp' id="addBtn" value={'Add'} />
                        }

                    </form>
                </div>

                {
                    notesArr.map((elm) => {
                        return <NoteItem note={elm} key={elm.id} editNote={editNote} deleteNote={deleteNote} />
                    })
                }


            </div>
        </>
    )
}
