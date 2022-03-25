import { useState, useEffect, useContext } from "react"; // hooks always starts with `use`
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "cat", "dog", "rabit", "raptile"];

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
        <div className="search-params">
            <form onSubmit={ e => {
                e.preventDefault();
                requestPets();
                }
            }
            >
                <label htmlFor="location">
                    Location
                    <input id="location" onChange={event => setLocation(event.target.value) } value={location} placeholder="Location" />
                </label>

                <label htmlFor={animal}>
                    Animal
                    <select value={animal} onChange={event => setAnimal(event.target.value)} onBlur={event => setAnimal(event.target.value)} id="animal">
                        <option /> {/*blank*/}
                        {
                            ANIMALS.map(animal => (
                                <option value={animal} key={animal}> {animal} </option> /* key must be unique */
                            ))
                        }
                    </select>
                </label>

                <label htmlFor={breed}>
                    Breed
                    <select value={breed} onChange={event => setBreed(event.target.value)} onBlur={event => setBreed(event.target.value)} id="breed">
                        <option /> {/*blank*/}
                        {
                            breeds.map(breed => (
                                <option value={breed} key={breed}> {breed} </option> /* key must be unique */
                            ))
                        }
                    </select>
                </label>

                <label htmlFor="theme">
                    Theme
                    <select value={theme} onChange={e => setTheme(e.target.value)} onBlur={e => setTheme(e.target.value)}>
                        <option value="darkblue">Dark Blue</option>
                        <option value="peru">peru</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                    </select>
                </label>

                <button style={{backgroundColor: theme}}>Submit</button>
            </form>
            <Results pets={pets} />                

        </div>
    );
};


export default SearchParams;