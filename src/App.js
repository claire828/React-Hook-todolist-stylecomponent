import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import tw from "twin.macro";
import Footer from "./components/footer/footer";
import Headers from "./components/header/Header";
import TaskItem from "./components/taskItem/taskItem";
import "./index.css";
import "./scss/taskItem.scss";
import { TaskContext } from "./utilities/context/context";
import createTask from "./utilities/createTask";



export const MenuEnum = {
  'all': 0,
  'active':1,
  'complete':2
}



function App() {
  const TaskContent = styled.div`${tw`flex-col w-[550px] mx-auto`}`

  //所有的任務區
  const [tasks, setTasks] = useState([]);
  //目前選單
  const [menuType, setMenuType] = useState(MenuEnum.all);
  //是否有勾選全部
  const [tickAll, setTickAll] = useState(false);
  //const [left,useLeft] = useState(tasks.filter(x=>!x.complete).length)

  //const displayTaskList =  menuType === MenuEnum.all ? tasks : tasks.filter(x=>x.complete === (menuType === MenuEnum.complete));
  const displayRef = useRef([]);
 
  
  const addTask =  useCallback((taskName)=>{
    if(!taskName) return;
    const task = createTask(taskName);
    setTasks([...tasks,task]);
  },[tasks]);

  const deleteTask = useCallback((taskId)=>{
    if(!taskId) return;
    setTasks(tasks=>tasks.filter(x=>x.taskId !== taskId));
  },[]);


  const renameTask = useCallback((taskId, newName)=>{
    if(!(newName&&taskId)) return;
     setTasks(tasks=>[...tasks.reduce( (result,curr)=>{
      if(curr.taskId === taskId) return [...result, {...curr, taskName:newName}];
      return [...result, curr];
     },[])]);
  },[]);

  const clearTasks = useCallback(()=>{
    setTasks(tasks=>[...tasks.filter(x=>!x.complete)]);
  },[]);
    
  const switchTickAll = useCallback(()=>{
    setTickAll(!tickAll);
    //勾選/取消 全選範圍時，更新所有的狀態
    let newTasks = Object.assign([],tasks);
    newTasks.forEach(x=>x.complete = tickAll);
    setTasks([...newTasks]);
  },[tickAll,tasks]);
  

  useEffect(()=>{
    displayRef.current =  menuType === MenuEnum.all ? tasks : tasks.filter(x=>x.complete === (menuType === MenuEnum.complete));
  },[menuType,tasks]);


  return (
    <div className="h-screen bg-green-800">
      <Headers tick={switchTickAll} addTask={addTask}></Headers>
      <TaskContext.Provider value={tasks} >
          <TaskContent>
            {tasks.map((x)=> <TaskItem  key={x.taskId} task={x} rename={renameTask} delete={deleteTask}></TaskItem> )}
          </TaskContent>
         {!!tasks.length && <Footer tabMenu={setMenuType} menuType={menuType} clear={clearTasks} />}
      </TaskContext.Provider>
    </div>
  );
}


export default App;
