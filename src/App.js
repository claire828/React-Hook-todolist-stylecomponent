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
import makeAxiosRequest from "./utilities/hooks/makeAxiosRequest";



export const MenuEnum = {
  'all': 0,
  'active':1,
  'complete':2
}

const DefaultUrl = "http://localhost:3004/tasks/"



function App() {
  const TaskContent = styled.div`${tw`flex-col w-[550px] mx-auto`}`

  //所有的任務區
  const [tasks, setTasks] = useState([]);
  //目前選單
  const [menuType, setMenuType] = useState(MenuEnum.all);
  //是否有勾選全部
  const [tickAll, setTickAll] = useState(false);

  const taskRef = useRef([]);
  taskRef.current = menuType === MenuEnum.all ? tasks : tasks.filter(x=>x.complete === (menuType === MenuEnum.complete));
  
  

  useEffect(()=>{
    const [source, request] = makeAxiosRequest("GET",DefaultUrl);
    const sendReq = async()=>{
      const result = await request();
      if(result) setTasks(result);
    }
    sendReq();
    return ()=> source.cancel();
  },[])
  
  const addTask =  useCallback((taskName)=>{
    if(!taskName) return;
    let task = createTask(taskName);
    const [source, request] = makeAxiosRequest("POST",DefaultUrl,task);
    const sendReq = async()=>{
      task = await request();
      setTasks(tasks=>[...tasks,task]);
    }

    sendReq();
  },[]);

  const deleteTask = useCallback((id)=>{
    if(!id) return;

   const [source, request] = makeAxiosRequest("DELETE",`${DefaultUrl}${id}`);
    const sendReq = async()=>{
      await request();
      setTasks(tasks=>tasks.filter(x=>x.id !== id));
    }
    sendReq();
  },[]);


  const renameTask = useCallback((task, newName)=>{
    if(!(newName&&task.id)) return;
    const [source, request] = makeAxiosRequest("PATCH",`${DefaultUrl}${task.id}`,{taskName:newName});
    const sendReq = async()=>{
      request();
      setTasks(tasks=>[...tasks.reduce( (result,curr)=>{
        if(curr.id === task.id) return [...result, {...curr, taskName:newName}];
        return [...result, curr];
       },[])]);
    }
    sendReq();

  },[]);

  const clearTasks = useCallback(()=>{
    setTasks(tasks=>[...tasks.filter(x=>!x.complete)]);
  },[]);
    
  const switchTickAll = ()=>{
    setTickAll(!tickAll);
    //勾選/取消 全選範圍時，更新所有的狀態
    let newTasks = Object.assign([],tasks);
    newTasks.forEach(x=>x.complete = !tickAll);
    setTasks([...newTasks]);
  }
  


  return (
    <div className="h-screen bg-green-800">
      <Headers tickAll={tickAll} tick={switchTickAll} addTask={addTask}></Headers>
      <TaskContext.Provider value={tasks} >
          <TaskContent>
            {taskRef.current.map((x)=> <TaskItem  key={x.taskId} task={x} rename={renameTask} delete={deleteTask}></TaskItem> )}
          </TaskContent>
         {!!tasks.length && <Footer tabMenu={setMenuType} menuType={menuType} clear={clearTasks} />}
      </TaskContext.Provider>
    </div>
  );
}


export default App;
