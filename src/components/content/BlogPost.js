import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
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
    axios.get(`http://localhost/index.php/wp-json/wp/v2/posts?slug=${this.state.slug}`)
      .then(res => {
        this.setState({
          title: res.data[0].title.rendered,
          date: res.data[0].date,
          content: res.data[0].content.rendered,
          author: res.data[0].author
        });
      });

    // axios.get(`http://localhost/index.php/wp-json/wp/v2/posts?slug=`)
  }

  render() {
    let { title, author, date, content } = this.state;
    let details = author ? `${author} - ${date}` : '';

    return (
      <div id='blogPost'>
        <h1>{title}</h1>
        <h2>{details}</h2>
        <div class='content' dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default Post;