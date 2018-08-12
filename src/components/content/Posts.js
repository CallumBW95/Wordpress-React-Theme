import React, { Component } from 'react';
import axios from 'axios';

import Post from './_partials/Post';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('index.php/wp-json/wp/v2/posts')
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  }

  render() {
    let posts = this.state.posts.map(post => <Post key={post.id} post={post} />);

    return (
      <div id='posts'>
        {posts}
      </div>
    );
  }
}

export default Posts;