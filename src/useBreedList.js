import { useState, useEffect } from "react";

const localCache = {}

export default function useBreedList(animal){
    // gets breed for provided animal
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState('unloaded');

    useEffect(()=>{
        if(!animal){  // if no animal is provided
            setBreedList([]);
        }
        else if(localCache[animal]){ //if element in local cache
            setBreedList(localCache[animal])
        }
        else{
            requestBreedList();
        }

        async function requestBreedList(){ //run everytime we render
            setBreedList([]);
            setStatus('loading');
            const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
            const json = await res.json();
            localCache[animal] = json.breeds || [];
            console.log(localCache);
            setBreedList(localCache[animal]);
            setStatus('loaded');
        }

    }, [animal])

    return [breedList, status];
};