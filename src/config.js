import React from "react";
import {Link} from 'react-router-dom';
import Search from "./components/search";

export default class Config extends React.Component{

    render() {
        return(
            <main>
                <div>
                    <h1>
                        Config
                    </h1>
                    <h3>
                        Enter Dog Breed
                    </h3>
                    <Search
                        onSubmit={this.props.changeBreed}
                    />
                    <br/>
                    <h3>
                        Enter Location
                    </h3>
                    <Search
                        onSubmit={this.props.changeLocation}
                    />
                    <Link to="/">
                        <button type="button" className="btn btn-primary">Submit</button>
                    </Link>
                </div>
            </main>

        )
    }
}