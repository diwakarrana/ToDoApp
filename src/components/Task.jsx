import React, {useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import { isAfter, isBefore, addDays, isToday } from 'date-fns';


const TaskHeaderMapping = {
INBOX  : "Inbox",
TODAY  : "Today",
NEXT_7 : "Next 7 Days"
};

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const FORMAT = 'dd/MM/yyyy';
const AddTask = ({onCancle, onAdd}) =>{

    const [newTask, setnewTask] = useState("");
    const [date, setDate] = useState(null);
    // console.log(newTask);
    // console.log(date);

    return  (
        <div className = "add-task-dialog">
                <input placeholder={"....add your task here"} value={newTask} onChange = {(event)=>setnewTask(event.target.value)}/>
                <div className="add-task-action-container">
                    <div className="btns-container">
                        <button disabled={!newTask} className="add-btn" 
                        onClick={(event)=>{onAdd(newTask,date); onCancle();setnewTask("")}}>Add Task</button>
                        <button className="cancle-btn" onClick = {()=>{onCancle();setnewTask("")}}>Cancle</button>
                    </div>
                    <div className="icon-container">
                        <DayPickerInput placeholder={`${dateFnsFormat(new Date,FORMAT)}`} onDayChange={(day)=>setDate(day)}  formatDate={formatDate}
                        format={FORMAT} dayPickerProps ={
                            {
                                modifiers : {
                                    disabled : [{before : new Date()}],
                                } ,
                            }  }/>
                    </div>
                </div>
            </div>
    )
}





const TaskItems = ({addedTask, selected}) => {
    // console.log(selected)
    let taskToRendar = [...addedTask];
    if(selected === "NEXT_7")
    {
        taskToRendar = taskToRendar.filter((task)=>
       isAfter( task.date , new Date()) && isBefore(task.date , addDays(new Date(), 7)))    
    }
    else if(selected === "TODAY")
    {
        taskToRendar = taskToRendar.filter((task)=> isToday( task.date ))
    }
    
        return (
            <div className = "task-items-container">
                 {
                    taskToRendar.map(t=>
                    <div className = "task-item">
                        <span>{t.task}</span>
                        <span>{dateFnsFormat(t.date,FORMAT)}</span>
                    </div>
                     )
                }
            </div>
        );
}//end of component 
      






const Task = ({selected}) => {
    // console.log(selected);
    const [showAddTask, setShowAddTask] = useState(false);
    const [addedTask, setaddedTask] = useState([]);

    const appendTask = (newTask, date) => {
        const nextTaskItem = {
            task : newTask,
            date : date || new Date()
        }
        setaddedTask((prevState)=>{setaddedTask([...prevState,nextTaskItem])});
    }

    return (
        <div className="task">
            <h1>{TaskHeaderMapping[selected]}</h1>
            {/* <div className="add-task-btn" onClick = {()=>setShowAddTask(!showAddTask)}> */}
            <div className="add-task-btn" onClick = {()=>setShowAddTask((prevState)=>!prevState)}>
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>
            </div>
        {showAddTask && <AddTask onCancle = {()=>setShowAddTask(false)}  onAdd = {appendTask}/>}

        {
            addedTask.length > 0 ? 
            <TaskItems addedTask={addedTask} selected={selected}/> : 
            <p>no task added</p>
        }
        </div>
    )
}

export default Task
