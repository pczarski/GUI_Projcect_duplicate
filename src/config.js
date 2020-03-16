import React from "react";
import {Link} from 'react-router-dom';
import Search from "./components/search";

// config page. It reuses the search.
// the onSubmit prop passed to search is the function you want to run once the
// text is submitted, the typed text will be passed to this function as argument
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
                    <h3>
                        Enter Location
                    </h3>
                    <Search
                        onSubmit={this.props.changeLocation}
                    />
                    <h3>
                        Enter Size
                    </h3>
                    <Search
                        onSubmit={this.props.changeSize}
                    />
                    <Link to="/">
                        <button type="button" className="btn btn-primary">Go Back</button>
                    </Link>
                </div>
            </main>

        )
    }
}