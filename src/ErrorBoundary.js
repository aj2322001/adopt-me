// You can get this from React webpage

import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component{
    state = { hasError: false };

    componentDidCatch(error, info){
        console.error('ErrorBoundary caught an error', error, info);
    }
    render(){
        if (this.state.hasError) {
            return(
                <h1>This listing has an error. <Link to="/">click here</Link> to go back to the home page</h1>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;