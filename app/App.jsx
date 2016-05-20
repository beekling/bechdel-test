import React from 'react';
import NavLink from './navigation/NavLink.jsx';
import Home from './home/Home.jsx';
import About from './about/About.jsx';
import Films from './films/Films.jsx';
import styles from './App.scss';

export default React.createClass({

  render() {
    return (
      <div className="site">
        <header>
          <a href='/' className="header--logo">Bechdel Test</a>
          <ul className="header--nav">
            <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        </header>

        <div className="container content">
          {
              this.props.children || <Home/>
          }
        </div>

        <footer className="footer">
          <div className="footer-content">
            <a href='http://www.callmejoe.net/'><p>Site by Joe.</p></a>
          </div>
        </footer>
      </div>
    )
  },
});