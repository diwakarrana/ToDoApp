import React, {useState}from 'react'
import Sidebar from './Sidebar'
import Task from './Task'

export const Content = () => {

    //INBOX
    //TODAY
    //NEXT_7
    const [selected, setSelected] = useState("INBOX");

    return (
        <section className = "content">
            <Sidebar selected={selected} setSelected={setSelected} />
            <Task selected={selected}></Task>
        </section>
    )
}
