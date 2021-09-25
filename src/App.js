import logo from './logo.svg';
import './App.css';
import React from "react";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataObj: null,
            today: "",
            dd: "",
            mm: "",
            yyyy: ""
        }
    }
    getDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //janvier = 0
        let yyyy = today.getFullYear();

        return dd + '/' + mm + '/' + yyyy;
    }


    async componentDidMount(){
        const url = `https://api.nasa.gov/planetary/apod?api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({dataObj: data});
        console.log(this.state.dataObj.copyright)
        this.getDate();
    }

    render() {
        return(
            <div>
                {!this.state.dataObj ? (
                    <h1>loading...</h1>
                ) : (
                    <div>
                        <h1 className="photoName">{this.state.dataObj.copyright}</h1>
                        <h1>Taken from NASA APOD {this.state.today}</h1>
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
