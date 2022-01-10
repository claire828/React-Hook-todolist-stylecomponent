import { useState } from "react";
import styled from "styled-components/macro";
import tw from "twin.macro";

export default function TaskItem(props){
    const task = props.task;
    const [edit, setEdit] = useState(false);
    const [input,setInput] = useState(task.taskName);

    const Wrap = styled.div`${tw`flex font-thin text-black bg-white justify-evenly items-center border
      border-color[gray] w-full h-[60px] `}`;

    const Icon = styled.input`${tw`w-10 h-10 outline-none`}`;

    const Task = styled.input`${tw`items-center w-full h-full p-2 text-xl font-thin bg-transparent outline-none`}
        ${(edit? tw`border border-gray-200 shadow-md` : tw`border-none`)}
        ${task.complete ? tw`text-gray-200 line-through` : ""};
        `;

    const DeleteBtn = styled.button`${tw`w-10 h-10 text-[#cc9a9a] transition duration-1000 ease-in-out`}`;
     

    const finishEdit = ()=>{
        setEdit(false);
        
        if(task.taskName === input) return;
        if(!input) return setInput(task.taskName);
        
        props.rename(task.taskId, input.trim());
    }


    return <>
            <Wrap className="wrap" >
                <Icon type={'text'}/>
                <Task value={input} 
                    readOnly={!edit}
                    autoFocus={edit}
                    onBlur={e=>{ finishEdit()}}
                    onInput={e=>setInput(e.target.value)} 
                    onKeyPress={e=> {e.key === 'Enter' && finishEdit()} }
                    onDoubleClick={(e)=>{ setEdit(true)}}></Task>

                <DeleteBtn className="delete"
                    onClick={(e)=>props.delete(task.taskId)}>X</DeleteBtn>
            </Wrap>
        </>
}

