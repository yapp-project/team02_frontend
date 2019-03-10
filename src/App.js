import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { MainView } from "./views";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainView} />
        </Switch>
      </div>
    );
  }
}

export default App;
