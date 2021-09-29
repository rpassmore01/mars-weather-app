import loading from './loading.svg'
import './App.css';
import React from "react";
import ReactPlayer from "react-player";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            apodData: null,
            roverData: null,
            time: '',
            roverPhotoIndex: 0,
            photoArrLength: 0,
            sol: 0,
            SolInput: ''
        }

        // Load defaults
        this.changeImgIndex = this.changeImgIndex.bind(this);
        this.changeImgIndexA = this.changeImgIndexA.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.changeSol = this.changeSol.bind(this);
    }

    //Load Defaults
    componentDidMount(){
        this.fetchApodData();
        this.fetchSol(this.state.sol);
    }

    // Returns a the date
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

    // Change roverPhotoIndex to a random new one
    changeImgIndex(){
        this.setState({
            roverPhotoIndex: Math.floor(Math.random()*this.state.photoArrLength)
        })
    }

    // Change roverPhotoIndex by a specified value
    changeImgIndexA(value) {
        let newValue = this.state.roverPhotoIndex + value;
        if(newValue < this.state.photoArrLength - 1 && newValue >= 0) {
            this.setState({
                roverPhotoIndex: newValue
            })
        }
    }

    // Pull JSON from NASA's APDO API
    async fetchApodData(){
        const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P`);
        const apodData = await apod.json();
        window.setInterval(()=>{
            this.setState({
                apodData: apodData,
            },)
        }, 3000)
        this.getDate();
    }

    // Pull JSON from NASA's Curiosity Photos API
    async fetchSol (inputSol){
        const rover = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${inputSol}&api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P`);
        const roverData = await rover.json();
        this.setState({
            roverData: roverData,
            photoArrLength: roverData.photos.length,
            sol: inputSol
        })
    }

    changeInput(event){
        this.setState({
            SolInput:event.target.value
        })
    }

    changeSol(event){
        this.fetchSol(this.state.SolInput)
        event.preventDefault()
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

                        {/* Title/Introduction */}

                        <h1>NASA API WEBSITE</h1>
                        <p>Here you can see the Astronomy Picture of the Day that updates everyday around midnight, as well as the curiosity rovers photos.</p>
                        <h3 className="timeFormat">Taken from NASA APOD at {this.state.time}</h3>

                        {/* Card 1 (APOD) */}

                        <div className="infoCard">
                            <h1 className="photoName">{this.state.apodData.title}</h1>
                            <h2>{this.state.apodData.copyright}</h2>
                            <p className="explanationText"> {this.state.apodData.explanation}</p>

                                <img className="apodImg" src={this.state.apodData.hdurl}/>

                                {/* Video Support */}
                                <ReactPlayer className="apodImg" url={this.state.apodData.url}/>
                        </div>

                        {/* Card 2 (Curiosity) */}

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
                                <form onSubmit={this.changeSol}>
                                    <input className="change-sol" type="text" value={this.state.SolInput} onChange={this.changeInput}/>
                                    <button className="change-sol-Btn" type="submit">Change Sol</button>
                                </form>

                                <button onClick={() => this.changeImgIndexA(1)} >Forward</button>
                                <button onClick={() => this.changeImgIndexA(-1)} >Backward</button>

                            </div>)}
                    </div>
                )}
            </div>
        );
    }
}

