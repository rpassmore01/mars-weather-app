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
            roverPhotoIndex: 0,
            photoArrLength: 0
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
            this.setState({
                apodData: apodData,
                roverData: roverData,
                photoArrLength: roverData.photos.length
            });
        }, 3000)
        this.getDate();
    }

    render() {
        window.setInterval(()=>{
            this.getDate()
        },5000)
        return(
            <div>
                {!this.state.apodData ? (
                    <div className="loadingImg">
                        <img src={loading} className="App-logo" />
                    </div>
                ) : (
                    <div className="mainContainer">
                        <h1>NASA API WEBSITE</h1>
                        <p>Here you can see the Astronomy Picture of the Day that updates everyday around midnight, as well as the curiosity rovers photos.</p>
                        <h3 className="timeFormat">Taken from NASA APOD at {this.state.time}</h3>
                        <div className="infoCard">
                            <h1 className="photoName">{this.state.apodData.title}</h1>
                            <h2>{this.state.apodData.copyright}</h2>
                            <p className="explanationText"> {this.state.apodData.explanation}</p>
                                <img src={this.state.apodData.hdurl} className="apodImg"/>
                        </div>
                        {!this.state.roverData ? <p> </p> : (
                            <div className="infoCard rover">
                                <h2>Image ID: {this.state.roverData.photos[this.state.roverPhotoIndex].id}</h2>
                                <p>Browse {this.state.photoArrLength} from Nasa's Mars Curiosity Rover!</p>
                                <img src={this.state.roverData.photos[this.state.roverPhotoIndex].img_src} className="apodImg"/>
                                <button className="roverBtn" onClick={()=>{this.setState({roverPhotoIndex: Math.floor(Math.random()*this.state.photoArrLength)})}}>Change Photo!</button>
                            </div>)}
                    </div>
                )}
            </div>
        );
    }
}

