import { useState, useEffect, useContext } from "react"; // hooks always starts with `use`
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState(""); {/*will bw fetched using API later*/}
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(()=>{
        // all our asynk code will come here
        requestPets();
    },[])

    async function requestPets(){
        const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
        const json = await res.json(); // result achieved by `res` will be stored here
        setPets(json.pets);
    }

    return(
        <div
            className="my-0 py-10 mx-auto w-10/12  "
        >
            <form 
                className="p-10 mb-10 rounded-xl bg-pink-200 shadow-lg
                flex flex-col justify-center items-center divide-y divide-gray-900 lg:w-9/12 xl:w-5/12 mx-auto"
                onSubmit={ e => {
                    e.preventDefault();
                    requestPets();
                    }
            }
            >
                <label className="search-label text-2xl" htmlFor="location">
                    Location
                    <input className="search-control " id="location" onChange={event => setLocation(event.target.value) } value={location} placeholder="Location" />
                </label>

                <label className="search-label text-2xl" htmlFor={animal}>
                    Animal
                    <select className="search-control " value={animal} onChange={event => setAnimal(event.target.value)} onBlur={event => setAnimal(event.target.value)} id="animal">
                        <option /> {/*blank*/}
                        {
                            ANIMALS.map(animal => (
                                <option value={animal} key={animal}> {animal} </option> /* key must be unique */
                            ))
                        }
                    </select>
                </label>

                <label className="search-label text-2xl" htmlFor={breed}>
                    Breed
                    <select  className="search-control disabled:opacity-50 " value={breed} onChange={event => setBreed(event.target.value)} onBlur={event => setBreed(event.target.value)} id="breed">
                        <option  className=" text-xs " > {/*{breed.length===0 ? ("select animal") : ("")}*/} </option>  {/*blank*/}
                        {
                            breeds.map(breed => (
                                <option value={breed} key={breed}> {breed} </option> /* key must be unique */
                            ))
                        }
                    </select>
                </label>

                <label className="search-label text-2xl" htmlFor="theme">
                    Theme
                    <select className="search-control " value={theme} onChange={e => setTheme(e.target.value)} onBlur={e => setTheme(e.target.value)}>
                        <option value="darkblue">Dark Blue</option>
                        <option value="peru">peru</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                    </select>
                </label>

                <button className=" rounded px-6 py-2 text-white hover:opacity-80 border-none " style={{backgroundColor: theme}}>Submit</button>
            </form>
            
            <Results pets={pets} />                

        </div>
    );
};


export default SearchParams;