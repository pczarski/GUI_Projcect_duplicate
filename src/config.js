import React from "react";
import {Link} from 'react-router-dom';
import Search from "./components/search";
import Select from "./components/select";
import "./config.css";
import $ from "jquery";

// config page. It reuses the search.
// the onSubmit prop passed to search is the function you want to run once the
// text is submitted, the typed text will be passed to this function as argument
export default class Config extends React.Component{
    constructor(props) {
        super(props);
    }

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

    render() {
        return(
            <main>
                <div className={(this.props.isDark) ? "App" : "App Clear"}>
                    <br/>
                    <Select 
                    changeBreed={this.props.changeBreed}
                    changeSize={this.props.changeSize}
                    isDark={this.props.isDark}
                    />
                    <label>
                        Enter Location
                    </label>
                    <Search
                        onSubmit={this.props.changeLocation}
                        isDark={this.props.isDark}
                        location = {this.props.location}
                    />
                    <Link to="/">
                        <button type="button" className={(this.props.isDark) ? "Button2 Dark" : "Button2"}>Go Back</button>
                    </Link>
                </div>
            </main>

        )
    }
}