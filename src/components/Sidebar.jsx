import React from 'react'
import { FaInbox, FaRegCalendar, FaRegCalendarAlt } from  'react-icons/fa'

const Sidebar = ({selected, setSelected}) => {

    // console.log(selected);
    //INBOX
    //TODAY
    //NEXT_7
    return (
        <div className = "sidebar">
            <div className = "active" onClick = {()=>{setSelected("INBOX")}}>
                <FaInbox className = "icon"/>
                Inbox
            </div >
            <div onClick = {()=>{setSelected("TODAY")}}>
            <FaRegCalendar className = "icon"/>
                Today
            </div>
            <div onClick = {()=>{setSelected("NEXT_7")}}>
            <FaRegCalendarAlt className = "icon"/>
                Next 7 Days
            </div>
        </div>
    )
}

export default Sidebar
