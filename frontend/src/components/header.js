import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {IndexLinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {requestCategories} from '../actions/categories.js'
import { capitalize } from '../utils/helpers.js'
import {withRouter} from 'react-router-dom'


class Header extends Component {
  componentDidMount() {
    this.props.requestCategories();
  }
  render(){
    const { categories } = this.props
    return(
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Project: Readable</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav>
        {categories.length > 0 && categories.map((category, key) => (
          <IndexLinkContainer key={key} to={`/${category.name}`}>
            <NavItem key={key}>{capitalize(category.name)}</NavItem>
          </IndexLinkContainer>
        ))}
          </Nav>
          <Nav pullRight>
            <IndexLinkContainer to={`/new`}>
              <NavItem>Add New Post</NavItem>
            </IndexLinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({categories}) => ({
  categories,
})

const mapDispatchToProps = dispatch => ({
  requestCategories: () => dispatch(requestCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
