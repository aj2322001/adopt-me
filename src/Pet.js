import { Link } from "react-router-dom";

const Pet = ({id, name, animal, breed, images, location})=>{

    let hero = 'http://pets-images.dev-apis.com/pets/none.jpg'; //pic for pet
    if(images.length){
        hero = images[0];
    }
    return(
        <Link to={`/details/${id}`} className="relative block">
            <div>
                <img className="rounded-3xl w-full object-cover hover:shadow-lg" src={hero} alt={name} />
            </div>
            <div className=" text-center absolute bottom-0 left-0 bg-gradient-to-tr
            from-white to-transparent px-3 pt-2 ">
                <h1 className=" font-bold text-xl text-pink-800 shadow-md " >{name}</h1>
                <h2 className=" text-black font-semibold " >{`${animal} | ${breed} | ${location}`}</h2>
            </div>
        </Link>
    );
};

export default Pet;