import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import tw from "twin.macro";
import Headers from "./components/header/Header";
import TaskItem from "./components/taskItem/taskItem";
import "./index.css";
import createTask from "./utilities/hooks/createTask";



export const MenuEnum = {
  'all': 0,
  'active':1,
  'complete':2
}



function App() {
  const TaskContent = styled.div`${tw`flex-col w-[550px] mx-auto`}`

  //所有的任務區
  const [tasks, setTasks] = useState([]);
  //顯示區域
  let [displayTaskList, setDisplayTaskList] = useState([]);
  //目前選單
  const [menuType, setMenuType] = useState(MenuEnum.complete);
  //是否有勾選全部
  const [tickAll, setTickAll] = useState(false);

 
  const addTask = (taskName)=>{
    if(!taskName) return;
    const task = createTask(taskName);
    setTasks([...tasks,task]);
  }

  const deleteTask = (taskId)=>{
    if(!taskId) return;
    setTasks(tasks.filter(x=>x.taskId !== taskId));
  }

  const renameTask = (taskId, newName)=>{
    if(!(newName&&taskId)) return;
     setTasks([...tasks.reduce( (result,curr)=>{
      if(curr.taskId === taskId) return [...result, {...curr, taskName:newName}];
      return [...result, curr];
     },[])]);
  }
  
  const switchTickAll = ()=>{
    setTickAll(!tickAll);
  }
  
  const tabMenu = (type)=>{
    setMenuType(type);
  }
  
  //勾選/取消 全選範圍時，更新所有的狀態
  useEffect(()=>{
    setTasks([...tasks.map(x=>x.complete = tickAll)]);
  }, [tickAll]);


  //每當選單或者列表異動時，要更新列表
  useEffect(()=>{
    console.log('每當選單或者列表異動時，要更新列表')
    const nextDisplayList = menuType === MenuEnum.all ? tasks : tasks.filter(x=>x.complete = (menuType === MenuEnum.complete));
    setDisplayTaskList(nextDisplayList);
  },[ menuType, tasks])


  //新增 / 刪除任務後的畫面更新
  useEffect(()=>{
    console.log(`tasks count:${tasks.length}`)
  }, [tasks]);

  return (
  
    <div className="h-screen bg-green-800">
        <Headers addTask={addTask}></Headers>
        <TaskContent>
          {displayTaskList.map((x,inx)=> <TaskItem  key={inx} task={x} rename={renameTask} delete={deleteTask}></TaskItem> )}
        </TaskContent>
    </div>
  );
}


export default App;
