import { useState } from "react"; // hooks always starts with hook

const ANIMALS = ["bird", "cat", "dog", "rabit", "raptile"];

const SearchParams = () => {
    const [location, setLocation] = useState("Seattle, WA");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState(""); {/*will bw fetched using API later*/}
    const breeds = [];
    return(
        <div className="search-params">
            <form>
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
                <button>Submit</button>
            </form>
        </div>
    );
};

export default SearchParams;