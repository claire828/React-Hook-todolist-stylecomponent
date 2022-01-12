import { useRef } from "react";


export default function useInput(onFinish = (str)=>{}){

    const ref = useRef("");

    function handleChange(e){
        if(e.key !=="enter") return;
        const str = ref.current.value.trim();
        if(!str) return;
        onFinish(str);
        ref.current.value = "";
    }
    


    return { ref, onKeyPress: (e)=>handleChange(e), onBlur: (e) =>handleChange(e)}

}