import logo from './logo.svg';
import loading from './loading.svg'
import './App.css';
import React from "react";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataObj: null,
            time: ''
        }

    }

    getDate() {
        let today = new Date();
        let hours = String(today.getHours());
        let min = String(today.getMinutes());

        if(min < 10){
            min = "0" + min;
        }
        if(hours>12){
            hours = parseInt(hours) - 12;
        }

        this.setState({
            time: hours + ":" + min
        })
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
        window.setInterval(()=>{
            this.getDate()
        },5000)
        return(
            <div>
                {!this.state.dataObj ? (
                    <img src={loading} className="App-logo" />
                ) : (
                    <div>
                        <h1 className="photoName">{this.state.dataObj.copyright}</h1>
                        <h3 className="timeFormat">Taken from NASA APOD at {this.state.time}</h3>
                        <p> {this.state.dataObj.explanation}</p>
                        <div className="imgContainer">
                            <img src={this.state.dataObj.hdurl} className="apodImg"/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
