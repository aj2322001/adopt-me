import { Component } from "react";

class Carousel extends Component{
    state = {
        active: 0
    };

    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
    }

    handleIndexClick = (event)=>{
        this.setState({
            active: +event.target.dataset.index //by default data received from json is `string`, to convert it to json add `+` as prefix   
        });
    }

    render(){
        const { active } = this.state;
        const { images } = this.props;

        return(
            <div className="carousel p-8 w-11/12 mx-auto grid lg:grid-cols-3 border-gray-200 border-b-2 my-7">
                <img className="col-span-2 lg:col-span-1 rounded-3xl object-cover m-auto" src={images[active]} alt="animal" />
                <div className="carousel-smaller col-span-2 m-auto flex flex-wrap justify-evenly">
                    {images.map((photo, index) => (
                        //eslint-disable-next-line
                        <img
                            key = {photo}
                            src = {photo}
                            data-index = {index}
                            onClick = {this.handleIndexClick}
                            className = { (index===active ? "active ":"") + "w-3/12 xl:w-2/12 rounded-full m-3 cursor-pointer transform hover:scale-105 transition ease-out" }
                            alt = "animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Carousel;