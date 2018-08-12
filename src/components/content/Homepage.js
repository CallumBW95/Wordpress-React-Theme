import React, { Component } from 'react';
import axios from 'axios';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }
  componentDidMount() {
    axios.get('/index.php/wp-json/wp/v2/pages?slug=home')
      .then(res => {
        this.setState({
          content: res.data[0].content.rendered
        });
      });
  }
  render() {
    let { content } = this.state
    return !content ? '' : (
      <div id='page'>
        <div className='content' dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default Homepage;