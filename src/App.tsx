import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callApi() {
        fetch("http://localhost:9000/testApi")
            .then((res) => res.text())
            .then((res) => this.setState({ apiResponse: res }))
            .catch((err) => err);
    }

    componentDidMount() {
        this.callApi();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {/* @ts-ignore */}
                    <p>{this.state.apiResponse}</p>
                </header>
            </div>
        );
    }
}

export default App;