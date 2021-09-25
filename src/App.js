import logo from './logo.svg';
import './App.css';
import React from "react";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataObj: null

        }
    }


    async componentDidMount(){
        const url = `https://api.nasa.gov/planetary/apod?api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({dataObj: data});
        console.log(this.state.dataObj.copyright)
    }

    render() {
        return(
            <div>
                {!this.state.dataObj ? (
                    <h1>loading...</h1>
                ) : (
                    <h1>{this.state.dataObj.copyright}</h1>
                )}
            </div>
        );
    }
}
