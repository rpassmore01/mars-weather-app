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
            photoArrLength: 0,
            sol: 0
        }
        this.changeImgIndex = this.changeImgIndex.bind(this);
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

    changeImgIndex(){
        this.setState({
            roverPhotoIndex: Math.floor(Math.random()*this.state.photoArrLength)
        })
    }

    async componentDidMount(){
        const randomSol = Math.round(Math.floor(Math.random()*1000))
        const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P`);
        const apodData = await apod.json();
        const rover = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${randomSol}&api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P`);
        const roverData = await rover.json();
        window.setInterval(()=>{
            this.setState({
                apodData: apodData,
                roverData: roverData,
                photoArrLength: roverData.photos.length,
                sol: randomSol
            },)
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
                                <h2>Photos are from Sol {this.state.sol}</h2>
                                {this.state.roverData.photos.length === 0 ? (
                                    <h3>No Images On This Day!</h3>
                                ): (
                                    <div className="onLoad">
                                        <p>Browse {this.state.photoArrLength} photos from Nasa's Mars Curiosity Rover!</p>
                                        <img src={this.state.roverData.photos[this.state.roverPhotoIndex].img_src} className="apodImg"/>
                                    </div>
                                )}
                                <button className="roverBtn" onClick={this.changeImgIndex} >Change Photo!</button>
                            </div>)}
                    </div>
                )}
            </div>
        );
    }
}

