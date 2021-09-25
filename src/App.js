import logo from './logo.svg';
import loading from './loading.svg'
import './App.css';
import React from "react";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            apodData: null,
            roverData: null,
            time: '',
            roverPhotoIndex: 0
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
        const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P`);
        const apodData = await apod.json();
        const rover = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P`);
        const roverData = await rover.json();
        window.setInterval(()=>{
            this.setState({apodData: apodData});
            this.setState({roverData: roverData})
        }, 3000)
        this.getDate();
    }

    render() {
        window.setInterval(()=>{
            this.getDate()
        },5000)
        return(
            <div>
                {!this.state.apodData && !this.state.roverData ? (
                    <div className="loadingImg">
                        <img src={loading} className="App-logo" />
                    </div>
                ) : (
                    <div className="mainContainer">
                        <h1 className="photoName">{this.state.apodData.title}</h1>
                        <h3 className="timeFormat">Taken from NASA APOD at {this.state.time}</h3>
                        <div className="infoCard">
                            <h2>{this.state.apodData.copyright}</h2>
                            <p className="explanationText"> {this.state.apodData.explanation}</p>
                                <img src={this.state.apodData.hdurl} className="apodImg"/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
