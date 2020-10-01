import React, { Component } from 'react'

import '../styles/Footer.css'

export default class Footer extends Component {
	render() {
		return (
      <footer>
        <div className="wrapper">
          <div className="footer-container">
            <p>
              Made at <a href="https://junocollege.com/" rel="noreferrer">Juno College</a> by{" "}
              <a href="https://github.com/nkanigsberg" rel="noreferrer">Nathan Kanigsberg</a>
            </p>
            <p>© Copyright 2020</p>
          </div>
        </div>
      </footer>
    );
	}
}
