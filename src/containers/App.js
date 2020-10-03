import React, {Component} from 'react';
import CartList from '../components/CartList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


class App extends Component {
    constructor(){
        super();
        this.state={
            robots: [],
            searchField: ''
        };
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) =>{
        this.setState({searchField: event.target.value});
    }

    render(){
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase());
        });

        return this.state.robots.length===0 ? 
        <h1>Loading</h1>:
        (
            <div className="tc">
                <h1>Robot Friends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CartList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>                
            </div>           
        )
    }
}

export default App;
