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
                    <div>
                        <h1 className="photoName">{this.state.dataObj.copyright}</h1>
                        <p>{this.state.dataObj.explanation}</p>
                        <div className="imgContainer">
                            <img src={this.state.dataObj.hdurl} className="apodImg"/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
