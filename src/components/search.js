// TODO: make the home screen weather display here
import React, {useState} from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
        };
    }

    updateQuery(e){
        this.setState({
            query: e.target.value,
        });
    };

    sendQuery(){
        this.props.onSubmit(this.state.query);
    }

    render() {
        return (
            <div className="search-box">
                <form>
                    <input
                        ref = "searchField"
                        type = "text"
                        className="search-bar"
                        placeholder="Enter text..."
                        onChange={(e) => this.updateQuery(e)}
                        value={this.state.query}
                    />
                    <button type="button" onClick = {() => this.sendQuery()}>
                        save
                    </button>
                </form>

            </div>
        )
    }

}

