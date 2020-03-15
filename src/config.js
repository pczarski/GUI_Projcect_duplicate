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
                    <Search
                        onSubmit={this.props.changeBreed}
                    />
                    <Link to="/">
                        <button type="button" className="btn btn-primary">Save</button>
                    </Link>
                </div>
            </main>

        )
    }
}