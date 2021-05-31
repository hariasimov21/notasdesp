import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import "../css/styles.css";

export default class Navigation extends Component {
  render() {
    return (
      <Nav
        className="navbar navbar-expand-lg navbar-dark bg-dark ml-auto justify-content-end"
        // activeKey="/home"
        // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item className="navHeader">
          <Nav.Link className="nav-link" href="/">
            Listado de Notas
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="navHeader">
          <Nav.Link
            className="nav-link"
            href="https://optimistic-tesla-a9a87c.netlify.app//create"
          >
            Crear Nota
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="navHeader">
          <Nav.Link
            className="nav-link"
            href="https://optimistic-tesla-a9a87c.netlify.app//user"
          >
            Crear Usuario
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
