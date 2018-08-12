import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      menuRaw: [],
      menu: {}
    }
  }

  urlToSlug(url) {
    return url.replace(/(http)(|s)(:\/\/)(www.|)[a-z]*(.com|)/g, '').replace(/\//g, '');
  }

  componentDidMount() {
    axios.get('index.php/wp-json/myroutes/menu')
      .then(res => {
        this.setState({
          menuRaw: res.data[this.state.type]
        });
        let menu = {};

        this.state.menuRaw.filter(item => item.menu_item_parent == 0).map(item => {
          menu[item.ID] = {
            order: item.menu_order,
            title: item.title,
            slug: `/${this.urlToSlug(item.url)}`,
            children: []
          };

          this.state.menuRaw.filter(childItem => childItem.menu_item_parent == item.ID).map(childItem => {
            menu[childItem.menu_item_parent].children[childItem.ID] = {
              order: childItem.menu_order,
              title: childItem.title,
              slug: `/${this.urlToSlug(childItem.url)}`,
            };
          });
          this.setState({ menu });
        });
      });
  }

  menuArrayToElements(array) {
    let element = Object.values(array).map(({ title, slug, order, children }) => {
      let child = children.length == 0 ? '' : Object.values(children).map(({ title, slug, order }) => {
        return <li key={order}><Link to={slug}>{title}</Link></li>
      });
      child = (<ul>{child}</ul>);

      return (
        <li key={order}>
          <Link to={slug}>{title}</Link>
          {children ? child : ''}
        </li>
      )
    });

    return element;
  }

  render() {
    let menu = this.state.menu ? this.menuArrayToElements(this.state.menu) : '';

    return (<nav>{menu}</nav>);
  }
}

export default Menu;