import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../css/styles.css";

export default class CreateUser extends Component {
  state = {
    users: [],
    username: "",
  };

  async componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const res = await axios.get(
      "https://james-tarea-note.herokuapp.com/api/users"
    );
    this.setState({ users: res.data });
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://james-tarea-note.herokuapp.com//api/users", {
      username: this.state.username,
    });
    this.setState({ username: "" });
    this.getUsers();
  };

  deleteUser = async (id) => {
    await axios.delete(
      `https://james-tarea-note.herokuapp.com/api/users/${id}`
    );
    this.getUsers();
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card card-body">
              <h4>Create New User :3</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    value={this.state.username}
                    type="text"
                    className="form-control"
                    onChange={this.onChangeUsername}
                  />
                </div>
                <Button type="submit" variant="primary" size="lg">
                  Crear usuario
                </Button>
              </form>
            </div>
          </div>
          <div className="col-md-8">
            <ul className="list-group">
              {this.state.users.map((user) => (
                <li
                  className="list-group-item list-group-item-primary d-flex justify-content-between align-items-center"
                  key={user._id}
                >
                  {user.username}

                  <Button
                    type="submit"
                    className="btn btn-primary userName"
                    size="sm"
                    onClick={this.deleteUser}
                  >
                    {" "}
                    eliminar usuario
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
