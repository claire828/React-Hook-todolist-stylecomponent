import { useState } from "react";
import { useRef } from "react/cjs/react.development";
import styled from "styled-components/macro";
import tw from "twin.macro";

export default function TaskItem(props){
    const task = props.task;
    const [edit, setEdit] = useState(false);
    const editRef = useRef('');

    const Wrap = styled.div`${tw`flex font-thin text-black bg-white justify-evenly items-center border
      border-color[gray] w-full h-[60px] `}`;

    const Label = styled.label`${tw``}`;
    const Icon = styled.input`${tw`w-10 h-10 appearance-none transition duration-150 ease-in-out border border-solid  border-green-600 rounded-full ml-2
        leading-5 font-bold flex justify-center items-center checked:bg-green-400 checked:after:content-[' ✓']`}`;

    const Task = styled.input`${tw`items-center w-full h-full p-2 text-xl font-thin bg-transparent outline-none`}
        ${(edit? tw`border border-gray-200 shadow-md` : tw`border-none`)}
        ${task.complete ? tw`text-gray-200 line-through` : ""}
        `;

    const DeleteBtn = styled.button`${tw`w-10 h-10 text-[#cc9a9a] transition duration-1000 ease-in-out`}`;
     

    const finishEdit = ()=>{
        setEdit(false);
        if(task.taskName === editRef.current.value) return;

        const newName = editRef.current.value.trim();
        if(!newName) editRef.current = task.taskName;
        
        props.rename(task, newName);
    }


    return <>
            <Wrap className="wrap" >
                <Label>
                    <Icon type={'checkbox'} defaultChecked={task.complete} />
                </Label>
                    <Task 
                        ref={editRef}
                        readOnly={!edit}
                        autoFocus={edit}
                        onBlur={e=>{ finishEdit()}}
                        defaultValue={task.taskName }
                        onKeyPress={e=> {e.key === 'Enter' && finishEdit()} }
                        onDoubleClick={(e)=>{ setEdit(true)}}></Task>
                
                <DeleteBtn className="delete"
                    onClick={(e)=>props.delete(task.id)}>X</DeleteBtn>
            </Wrap>
        </>
}

