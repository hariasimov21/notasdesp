import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import "../css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    editing: false,
    _id: "",
  };

  async componentDidMount() {
    const res = await axios.get(
      "https://james-tarea-note.herokuapp.com/api/users"
    );
    this.setState({
      users: res.data.map((user) => user.username),
      userSelected: res.data[0].username,
    });
    if (this.props.match.params.id) {
      const res = await axios.get(
        "https://james-tarea-note.herokuapp.com/api/notes/" +
          this.props.match.params.id
      );
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        editing: true,
        _id: this.props.match.params.id,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected,
    };
    if (this.state.editing) {
      await axios.put(
        "https://james-tarea-note.herokuapp.com/api/notes/" + this.state._id,
        newNote
      );
    } else {
      await axios.post(
        "https://james-tarea-note.herokuapp.com/api/notes",
        newNote
      );
    }
    window.location.href = "/";
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onDateChange = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3 notas">
        <div className="card card-body">
          <h4> Create a Note</h4>
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="title"
              name="title"
              onChange={this.onInputChange}
              value={this.state.title}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="content"
              name="content"
              onChange={this.onInputChange}
              value={this.state.content}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onDateChange}
              locale="es"
            />
          </div>

          <form onSubmit={this.onSubmit}>
            <Button type="submit" variant="primary" size="lg">
              Create Note
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
