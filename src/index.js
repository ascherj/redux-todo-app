import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import './style.css';

const countReducer = (state = { count: 0}, action) => {
  switch (action.type) {
    case 'INC': return { count: state.count + 1 };
    case 'DEC': return { count: state.count - 1 };
    default: return state;
  }
}

const reducers = combineReducers({
  counter: countReducer,
})

const actions = {
  inc: () => ({ type: 'INC' }),
  dec: () => ({ type: 'DEC' }),
};

const store = createStore(reducers);

class App extends Component {
  render() {
    console.log(this.props, actions);
    return (
      <div>
        <button onClick={this.props.inc}>Increment</button>
        <button onClick={this.props.dec}>Decrement</button>
        <div>Value: {this.props.count}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ counter }) => {
  return { count: counter.count };
}

const AppContainer = connect(mapStateToProps, actions)(App);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
