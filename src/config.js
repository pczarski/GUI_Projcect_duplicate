import React from "react";
import {Link} from 'react-router-dom';
import Search from "./components/search";
import Select from "./components/select";



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
                    </h1><br/>
                    <Select 
                    onSubmit1={this.props.changeBreed}
                    onSubmit2={this.props.changeSize}
                    />
                    <h3>
                        Enter Location
                    </h3>
                    <Search
                        onSubmit={this.props.changeLocation}
                    />
                    <Link to="/">
                        <button type="button" className="Button2">Go Back</button>
                    </Link>
                </div>
            </main>

        )
    }
}