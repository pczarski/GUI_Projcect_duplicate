// TODO: make the home screen weather display here
import React, {useState} from 'react';
import {breeds} from "../assets/breeds.js";

export default class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            breed: "Golden Retriever",
            size: "Large",
            message: "",
        };
    }

    // updates the state of this component to the current text in the field
    handleSelect(){
        const e = document.getElementById("dropdown");
        this.state.breed = e.options[e.selectedIndex].text;
        this.state.size = e.options[e.selectedIndex].value;
    };

    updateDog() {
        this.props.changeBreed(this.state.breed);
        this.props.changeSize(this.state.size);
        this.setState({
            message: "Saved!",
        });
    };

    removeMessage = () => {
        this.setState({
            message: "",
        })
    };

    render() {
        // map supported dog breeds onto html tag
        const renderedBreeds = breeds.map((breed) => {
            return (
                <option value={breed.size}>{breed.breed}</option>
            );
        });

        return (
            <div >
                <label >Select your breed </label><br></br>
                <select id="dropdown" onChange={() => this.handleSelect()}
                        className={(this.props.isDark) ? "Select Dark" : "Select"}
                        onClick={this.removeMessage}
                >
                    <option value="Large">-Please Select-</option>
                    {renderedBreeds}


                </select><br/>
                <button type="button" onClick = {() => this.updateDog()} className={(this.props.isDark) ? "Button2 Dark" : "Button2"}>
                    save
                </button>
                <span className="message">{this.state.message}</span>
                <br/>
                <br/></div>
        )
    }

}