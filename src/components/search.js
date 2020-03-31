// TODO: make the home screen weather display here
import React, {useState} from 'react';
import $ from 'jquery';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            message: "",
            error: false,
        };
    }

    // updates the state of this component to the current text in the field
    updateQuery(e){
        this.setState({
            query: e.target.value,
        });
    };

    // passes the query the the given function
    sendQuery(){
        this.props.onSubmit(this.state.query);
        this.checkLocation(this.state.query);
    };

    checkLocation(location) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+location+"&APPID=5890b051c398fd53af1e1a449157b1de",
            success: this.locationSuccess,
            error: this.locationError,
        })
    };

    locationSuccess = ()  => {
        this.setState({
            message: "Saved!",
            error: false,
        })
    };

    locationError = () => {
        this.setState({
            message: "Could not find: " + this.state.query,
            error: true,
        })
    };

    removeMessage = () => {
        this.setState({
            message: "",
        })
    };

    render() {
        return (
            <div className="search-box">
                <form>
                    <input
                        ref = "searchField"
                        type = "text"
                        className={(this.props.isDark) ? "searchDark" : "search-bar"}
                        placeholder="Enter text..."
                        onChange={(e) => this.updateQuery(e)}
                        value={this.state.query}
                        onClick = {this.removeMessage}
                    />
                    <button type="button" onClick = {() => this.sendQuery()} className={(this.props.isDark) ?"Button2 Dark" : "Button2"}>
                        save
                    </button>
                    <span id="message" className={this.state.error ? "message error" : "message"}> {this.state.message}</span>
                </form>

            </div>
        )
    }

}

