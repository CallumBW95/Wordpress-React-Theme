import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.post.date,
      title: props.post.title.rendered,
      excerpt: props.post.excerpt.rendered,
      link: `/blog/${props.post.slug}`
    };
  }

  componentDidMount() {
  }

  render() {
    let { title, excerpt, link, date } = this.state;

    return (
      <div className='post'>
        <Link to={link}>
          <h3>{title}</h3>
          <h4>{date}</h4>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
        </ Link>
      </div>
    );
  }
}

export default Post;