// TODO: make the home screen weather display here
import React from 'react';
import $ from 'jquery';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            message: "", // saved or an error
            error: false, // for changing styles of the error message
        };
    }

    // updates the state of this component to the current text in the field
    updateQuery(e){
        this.setState({
            query: e.target.value,
        });
    };

    // handle saving
    handleQuery(){
        this.checkLocation(this.state.query);
    };

    /*
    Send query to check if location exists. Update the state accordingly.
    The reason for not using fetchWeather() from App.js is
    that we do not want to change the location if it is not supported/ doesn't exist.
     */
    checkLocation(location) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+location+"&APPID=5890b051c398fd53af1e1a449157b1de",
            success: this.locationSuccess,
            error: this.locationError,
        })
    };

    // update location if success
    locationSuccess = ()  => {
        this.props.onSubmit(this.state.query);
        this.setState({
            message: "Saved!",
            error: false,
        });
    };

    // do not update location on error
    locationError = (error) => {
        const response = JSON.parse(error.responseText);
        if(response.cod === "404") {
            this.setState({
                message: "Could not find: " + this.state.query,
                error: true,
            });
        }
        else {
            this.setState({
                message: "Unexpected error occurred. Try to open the app again, if the problem persist please report the issue.",
            })
        }
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
                    <button type="button" onClick = {() => this.handleQuery()} className={(this.props.isDark) ?"Button2 Dark" : "Button2"}>
                        save
                    </button>
                    <span id="message" className={this.state.error ? "message error" : "message"}> {this.state.message}</span>
                </form>
            </div>
        )
    }

}

