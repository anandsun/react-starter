import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        Hello World! How are you? I am fine. Thank you
      </div>
    );
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById('content'));

if (module.hot) {
  module.hot.accept();
}