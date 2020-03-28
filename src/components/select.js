// TODO: make the home screen weather display here
import React, {useState} from 'react';

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breed: "Golden Retriever",
            size: "Large",
        };
    }

    // updates the state of this component to the current text in the field
    updateDog(){
        const e = document.getElementById("dropdown");
        this.state.breed = e.options[e.selectedIndex].text;
        this.state.size = e.options[e.selectedIndex].value;
        this.props.onSubmit1(this.state.breed);
    };

    
    sendSize(){
        this.props.onSubmit2(this.state.size);
    }

    render() {
        return (
            <div >
                <label >Select your breed </label><br></br>
                <select id="dropdown" onChange={() => this.updateDog()}  className={(this.props.isDark) ? "Select Dark" : "Select"} >
                    <option value="Large">Golden Retriever</option>
                    <option value="Large">German Shepherd</option>
                    <option value="Medium">Beagle</option>
                    <option value="Small">Pug</option>
                    <option value="Small">Pomeranian</option>
                    <option value="Large">Husky</option>
                    <option value="Medium">Shiba Inu</option>
                    <option value="Medium">Bulldog</option>
                    <option value="Large">Boxer</option>
                    <option value="Small">Chihuahua</option>
                    <option value="Large">Dalmatian</option>
                    <option value="Small">Rottweiler</option>

                </select><br/>
                <button type="button" onClick = {() => this.sendSize()} className={(this.props.isDark) ? "Button2 Dark" : "Button2"}>
                    save
                </button><br/>
                <br/></div>
        )
    }

}

