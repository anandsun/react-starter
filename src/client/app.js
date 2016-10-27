import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

class Pokémon extends React.Component {
  handleSubmit(event) {
    this.setState({name: this.state.input})
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  // Display the current Pokémon name
  displayName() {
    return name_par(this.state.name);
  }

  constructor() {
    super();
    this.state = {
      name : null,
      input: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <p>Pokémon:</p>
        <input type="text" onChange={this.handleChange} />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
        {this.displayName()}
=======
        Hello World! How are you? I am fine. Thank you
>>>>>>> origin/master
      </div>
    );
  }
}

<<<<<<< HEAD
function name_par(name) {
  return (
    <p id="name">
      {name}
    </p>
  );
}

ReactDOM.render(<Pokémon />, document.getElementById('content'));
=======
ReactDOM.render(<HelloWorld />, document.getElementById('content'));

if (module.hot) {
  module.hot.accept();
}
>>>>>>> origin/master
