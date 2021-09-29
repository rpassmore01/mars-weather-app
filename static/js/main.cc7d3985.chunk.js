(this["webpackJsonpmars-weather-app"]=this["webpackJsonpmars-weather-app"]||[]).push([[0],{21:function(t,e,a){},23:function(t,e,a){},47:function(t,e,a){"use strict";a.r(e);var n=a(1),s=a.n(n),o=a(11),r=a.n(o),c=(a(21),a(5)),i=a.n(c),h=a(7),l=a(12),u=a(13),d=a(4),p=a(16),j=a(15),g=a.p+"static/media/loading.ad2f8600.svg",m=(a(23),a(14)),x=a.n(m),b=a(0),v=function(t){Object(p.a)(a,t);var e=Object(j.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).state={apodData:null,roverData:null,time:"",roverPhotoIndex:0,photoArrLength:0,sol:0,SolInput:""},n.changeImgIndex=n.changeImgIndex.bind(Object(d.a)(n)),n.changeImgIndexA=n.changeImgIndexA.bind(Object(d.a)(n)),n.changeInput=n.changeInput.bind(Object(d.a)(n)),n.changeSol=n.changeSol.bind(Object(d.a)(n)),n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.fetchApodData(),this.fetchSol(this.state.sol)}},{key:"getDate",value:function(){var t=new Date,e=String(t.getHours()),a=String(t.getMinutes());a<10&&(a="0"+a),e>12&&(e=parseInt(e)-12),this.setState({time:e+":"+a})}},{key:"changeImgIndex",value:function(){this.setState({roverPhotoIndex:Math.floor(Math.random()*this.state.photoArrLength)})}},{key:"changeImgIndexA",value:function(t){var e=this.state.roverPhotoIndex+t;e<this.state.photoArrLength-1&&e>=0&&this.setState({roverPhotoIndex:e})}},{key:"fetchApodData",value:function(){var t=Object(h.a)(i.a.mark((function t(){var e,a,n=this;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.nasa.gov/planetary/apod?api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P");case 2:return e=t.sent,t.next=5,e.json();case 5:a=t.sent,window.setInterval((function(){n.setState({apodData:a})}),3e3),this.getDate();case 8:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"fetchSol",value:function(){var t=Object(h.a)(i.a.mark((function t(e){var a,n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=".concat(e,"&api_key=4yGlazBb3PftsRRldGwC15JNnjayMwNxE4pEPc1P"));case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,this.setState({roverData:n,photoArrLength:n.photos.length,sol:e});case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"changeInput",value:function(t){this.setState({SolInput:t.target.value})}},{key:"changeSol",value:function(t){this.fetchSol(this.state.SolInput),t.preventDefault(),this.setState({SolInput:""})}},{key:"render",value:function(){var t=this;return window.setInterval((function(){t.getDate()}),5e3),Object(b.jsx)("div",{children:this.state.apodData?Object(b.jsxs)("div",{className:"mainContainer",children:[Object(b.jsx)("h1",{children:"NASA API WEBSITE"}),Object(b.jsx)("p",{children:"Here you can see the Astronomy Picture of the Day that updates everyday around midnight, as well as the curiosity rovers photos."}),Object(b.jsxs)("h3",{className:"timeFormat",children:["Taken from NASA APOD at ",this.state.time]}),Object(b.jsxs)("div",{className:"infoCard",children:[Object(b.jsx)("h1",{className:"photoName",children:this.state.apodData.title}),Object(b.jsx)("h2",{children:this.state.apodData.copyright}),Object(b.jsxs)("p",{className:"explanationText",children:[" ",this.state.apodData.explanation]}),Object(b.jsx)("img",{className:"apodImg",src:this.state.apodData.hdurl}),Object(b.jsx)(x.a,{className:"apodImg",url:this.state.apodData.url})]}),this.state.roverData?Object(b.jsxs)("div",{className:"infoCard rover",children:[Object(b.jsxs)("h2",{children:["Photos are from Sol ",this.state.sol]}),0===this.state.roverData.photos.length?Object(b.jsx)("h3",{children:"No Images On This Day!"}):Object(b.jsxs)("div",{className:"onLoad",children:[Object(b.jsxs)("p",{children:["Browse ",this.state.photoArrLength," photos from Nasa's Mars Curiosity Rover!"]}),Object(b.jsx)("img",{src:this.state.roverData.photos[this.state.roverPhotoIndex].img_src,className:"apodImg"})]}),Object(b.jsxs)("form",{onSubmit:this.changeSol,className:"rover-form",children:[Object(b.jsx)("input",{className:"change-sol",type:"text",value:this.state.SolInput,onChange:this.changeInput}),Object(b.jsx)("button",{className:"change-sol-Btn",type:"submit",children:"Change Sol"})]}),Object(b.jsx)("button",{onClick:function(){return t.changeImgIndexA(1)},children:"Forward"}),Object(b.jsx)("button",{onClick:this.changeImgIndex,children:"Random"}),Object(b.jsx)("button",{onClick:function(){return t.changeImgIndexA(-1)},children:"Backward"})]}):Object(b.jsx)("p",{children:" "})]}):Object(b.jsx)("div",{className:"loadingImg",children:Object(b.jsx)("img",{src:g,className:"App-logo"})})})}}]),a}(s.a.Component),f=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,48)).then((function(e){var a=e.getCLS,n=e.getFID,s=e.getFCP,o=e.getLCP,r=e.getTTFB;a(t),n(t),s(t),o(t),r(t)}))};r.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(v,{})}),document.getElementById("root")),f()}},[[47,1,2]]]);
//# sourceMappingURL=main.cc7d3985.chunk.js.map