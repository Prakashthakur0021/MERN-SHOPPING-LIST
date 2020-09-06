import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";
import AddItem from "./components/itemModal";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <AddItem />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
