import React, { Component } from 'react';
import axios from 'axios';

import Menu from './Menu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  componentDidMount() {
    axios.get('index.php/wp-json/')
      .then(res => {
        this.setState({ title: res.data.name });
      })
  }

  render() {
    let { title } = this.state;
    return (
      <div id="Header">
        <h2>{title}</h2>
        <Menu type='header' />
      </div>
    )
  }
}
export default Header;