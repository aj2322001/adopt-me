import Pet from "./Pet";

const Results = ({pets}) => {
    return ( 
        <div className="search">
            {
                !pets.length ? (
                    <h2>No Pets Found</h2>
                ):(
                    pets.map((pet)=>(
                        <Pet 
                            id={pet.id}
                            animal={pet.animal} 
                            name={pet.name} 
                            breed={pet.breed} 
                            images={pet.images}
                            location={`${pet.city}, ${pet.state}`}
                            key={pet.id} //will keep track, won't be passes
                        />
                    ))
                )
            }
        </div>
     );
}
 
export default Results;