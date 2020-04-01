import React from "react";
import {Link} from 'react-router-dom';
import Search from "../components/search";
import Select from "../components/select";
import "./config.css";

// config page
export default function Config(props) {
        return(
            <main>
                <div className={(props.isDark) ? "App" : "App Clear"}>
                    <br/>
                    <Select 
                    changeBreed={props.changeBreed}
                    changeSize={props.changeSize}
                    isDark={props.isDark}
                    />
                    <label>
                        Enter Location
                    </label>
                    <Search
                        onSubmit={props.changeLocation}
                        isDark={props.isDark}
                    />
                    <Link to="/">
                        <button type="button" className={(props.isDark) ? "Button2 Dark" : "Button2"}>Go Back</button>
                    </Link>
                </div>
            </main>

        )
 //   }
}