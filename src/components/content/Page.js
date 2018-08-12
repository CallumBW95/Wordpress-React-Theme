import React, { Component } from 'react';
import axios from 'axios';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: this.props.match.params.slug,
      title: '',
      date: '',
      author: '',
      content: ''
    };
  }

  componentDidMount() {
    axios.get(`index.php/wp-json/wp/v2/pages?slug=${this.state.slug}`)
      .then(res => {
        this.setState({
          title: res.data[0].title.rendered,
          date: res.data[0].date,
          content: res.data[0].content.rendered,
          author: res.data[0].author,
          slug: this.props.match.params.slug
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setState({
      slug: this.props.location.pathname.replace('/', '')
    });
  }

  render() {
    let { title, date, content, author, slug } = this.state;

    return (
      <div id='page'>
        <h1>{title}</h1>
        <div className='content' dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default Page;