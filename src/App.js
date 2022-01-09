import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import tw from "twin.macro";
import Footer from "./components/footer/footer";
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
  const [menuType, setMenuType] = useState(MenuEnum.all);
  //是否有勾選全部
  const [tickAll, setTickAll] = useState(false);
  //剩餘active
  const [left, setLeft] = useState(0);


 
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

  const clearTasks = ()=>{
    setTasks([...tasks.filter(x=>!x.complete)]);
  }
    
  const switchTickAll = ()=>{
    setTickAll(!tickAll);
  }
  

  
  //勾選/取消 全選範圍時，更新所有的狀態
  useEffect(()=>{
      let newTasks = Object.assign([],tasks);
      newTasks.forEach(x=>x.complete = tickAll);
      setTasks([...newTasks]);
    }, [tickAll]);


  //每當選單或者列表異動時，要更新列表
  useEffect(()=>{
    //console.log('每當選單或者列表異動時，要更新列表')
    const nextDisplayList = menuType === MenuEnum.all ? tasks : tasks.filter(x=>x.complete === (menuType === MenuEnum.complete));
    setDisplayTaskList(nextDisplayList);
  },[ menuType, tasks])


  //新增 / 刪除任務後的畫面更新
  useEffect(()=>{
    setLeft(tasks.filter(x=>!x.complete).length);
  }, [tasks]);

  return (
    <div className="h-screen bg-green-800">
        <Headers tick={switchTickAll} addTask={addTask}></Headers>
        <TaskContent>
          {displayTaskList.map((x,inx)=> <TaskItem  key={inx} task={x} rename={renameTask} delete={deleteTask}></TaskItem> )}
        </TaskContent>
       { tasks.length>0 && <Footer count={left} tabMenu={setMenuType} menuType={menuType} clear={clearTasks} />}
    </div>
  );
}


export default App;
