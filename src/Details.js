import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

class Details extends Component {
  
  state = { loading: true };

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
  render() { //always called in class component
    if (this.state.loading){
        return <h2>loading...</h2>
    }
    const {animal, breed, city, state, description, name, images} = this.state

    return(
        <div className="details">
            <Carousel images={images}/>
            <h1>{name}</h1>
            <h2>{animal} - {breed} - {city}, {state}</h2>
            <button>Adopt {name}</button>
            <p>{description}</p>
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
