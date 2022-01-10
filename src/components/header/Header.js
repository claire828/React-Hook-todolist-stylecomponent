import { useState } from "react";
import { useRef } from "react/cjs/react.development";
import styled from "styled-components/macro";
import tw from "twin.macro";


export default function Headers(props){
    const {addTask,tick} = props; 
    const DEFAULT_MSG = 'What need to be done?';
    
    const Wrap = styled.div`${tw`flex flex-col w-[550px] mx-auto align-middle`}`;
    const Title = styled.div`${tw`w-full pt-10 mx-auto mt-6 font-thin text-center text-red-400 text-9xl`}`;
    
    const InputContainer = styled.div`${tw `relative flex justify-start w-full`}`
    const Input = styled.input`${tw` border mx-auto h-[65px] font-size[large] w-full text-gray-500 border-color[gray] outline-none italic p-4 pl-10 shadow-sm`}`;
    const Icon = styled.label`${tw`absolute before:content-['❯'] font-size[22px] text-[#e6e6e6] mx-4 mt-4`} 
        transform: rotate(90deg) `;
        
    //const [input, setInput] = useState(''); 
    const taskRef = useRef('');


    const onAddTask = (e)=>{
        const text = taskRef.current.value.trim();
        taskRef.current.value = "";
        if(!text) return;
        
        addTask(text);
        
        //addTask(input);
        //setInput('');
    }


    return <>
        <Wrap>
            <Title>todos</Title>
            <InputContainer>
                <Icon onClick={e=>tick(e)} />
                <Input placeholder={DEFAULT_MSG} 
                    onBlur={onAddTask} 
                    ref={taskRef}
                    onKeyPress={e=> e.key === 'Enter' && onAddTask(e) }
                    //value={input} 
                    //onInput={e => setInput(e.target.value)} 
                    autoFocus />
            </InputContainer>
        </Wrap>
    </>
}