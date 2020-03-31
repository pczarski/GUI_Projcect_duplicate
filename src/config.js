import React from "react";
import {Link} from 'react-router-dom';
import Search from "./components/search";
import Select from "./components/select";
import "./config.css";

// config page. It reuses the search.
// the onSubmit prop passed to search is the function you want to run once the
// text is submitted, the typed text will be passed to this function as argument
export default function Config(props) {// extends React.Component{
    // constructor(props) {
    //     super(props);
    // }

 //   handleSaveLocation(data){
        // $.ajax({
        //     url: url,
        //     dataType: "json",
        //     success: this.updateForecast,
        // });
 //   }

    // handleSaveBreed = (data) =>{
    //     this.props.changeBreed(data);
    //     this.props.changeSize();
    //     this.setState({
    //         currentMessage: "dog updated!"
    //     })
   // };

 //   render() {
        return(
            <main>
                <div className={(props.isDark) ? "App" : "App Clear"}>
                    <br/>
                    <Select 
                    changeBreed={props.changeBreed}
                    changeSize={props.changeSize}
                    isDark={props.isDark}
                    />
                    <label>
                        Enter Location
                    </label>
                    <Search
                        onSubmit={props.changeLocation}
                        isDark={props.isDark}
                        // hasError = {this.props.hasError}
                        // setHasError = {this.props.setHasError}
                        // message = {this.props.message}
                        // setMessage = {this.props.setMessage}
                        // fetchWeather = {this.props.fetchWeather}
                    />
                    <Link to="/">
                        <button type="button" className={(props.isDark) ? "Button2 Dark" : "Button2"}>Go Back</button>
                    </Link>
                </div>
            </main>

        )
 //   }
}