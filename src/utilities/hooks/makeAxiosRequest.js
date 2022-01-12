import axios from "axios";

export default function makeAxiosRequest(method, url, payload={}){
    let source = axios.CancelToken.source();

    const makeRequest = async()=>{
        const cancelToken = source.token
        const config = {
            method,
            url,
            data:{...payload},
            //header一定要設定，json-server才可以動
            headers: { 'content-type': 'application/json' },
            cancelToken
        }

        try{
            var result = await axios(config)
        }catch (error){
            console.log(`error`)
            if (axios.isCancel(error)) return;
            return error
        }
      //  console.log(`req:${JSON.stringify(result.data)}`)
        return result.data;
        
    }

    return [source, makeRequest];
   
}