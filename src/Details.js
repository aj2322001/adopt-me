import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    ); //getting ID from `/:id` in App.js
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false
        },
        json.pets[0]
      )
    );
  }

  toggleModal = ()=> this.setState({showModal: !this.state.showModal});
  adopt = ()=>(window.location = "http://bit.ly/pet-adopt");

  render() { //always called in class component
    // throw new Error("hi");
    if (this.state.loading){
        return <h2>loading...</h2>
    }
    const {animal, breed, city, state, description, name, images, showModal} = this.state

    return(
        <div className="details bg-pink-100 w-11/12 mx-auto rounded-xl">
            <Carousel images={images}/>
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-5xl my-5 text-pink-600" >{name}</h1>
              <h2 className="font-semibold text-3xl my-3 text-pink-500">{animal} - {breed} - {city}, {state}</h2>
              <ThemeContext.Consumer>
                {([theme]) => (
                  <button className="text-white shadow-xl  py-3 px-5 m-3 rounded-xl transform hover:scale-105 transition ease-out" onClick={this.toggleModal} style={{backgroundColor: theme}}>Adopt {name}</button>
                )}
              </ThemeContext.Consumer>
            </div>

            <p className="p-7 mb-10 text-2xl text-gray-700">{description}</p>

            {
              showModal ? ( //change this !
                <Modal>
                  <div className=" w-full h-full absolute z-40 flex justify-center items-center">
                    <div className=" p-32 rounded-xl  text-2xl def-gradient text-pink-50">
                      <h1>Would you like to adopt {name}?</h1>
                      <div className="buttons mt-12 flex justify-evenly">
                        <button className="btn hover:text-bold" onClick={this.adopt}>Yes</button>
                        <button className="btn hover:text-bold" onClick={this.toggleModal}>No</button>
                      </div>
                    </div>
                  </div>
                </Modal>
              ) : null
            }
        </div>
    )
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary(){
  return(
    <ErrorBoundary>
      <DetailsWithRouter/>
    </ErrorBoundary>
  );
}; // React Router doesn't pass us info by default, we need to ask for it ourselves 
