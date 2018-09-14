import React from 'react';
import '../../App.css';
import axios from 'axios';

class Smurf extends React.Component {
  state = {
    isEditing: false,
    smurf: null,
    name: '',
    age: '',
    height: ''
  }

  get id() {
    return this.props.match.params.id;
  }

  componentWillMount() {
    axios
      .get(`http://localhost:3333/smurfs/${this.id}`)
      .then(response => {
        this.setState({ smurf: response.data,
                        name: response.data.name,
                        age: response.data.age,
                        height: response.data.height });
      })
      .catch(error => console.log(error));
  }

  toggleEditMode = e => {
    e.preventDefault();

    if (this.state.name === "") {
      axios
        .get(`http://localhost:3333/smurfs/${this.id}`)
        .then(response => {
          this.setState({ name: response.data.name,
                          age: response.data.age,
                          height: response.data.height });
        })
        .catch(error => console.log(error));
    }
  }


  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (!this.state.smurf) {
      return (
        <div>Loading smurf...</div>
      )
    }

    return (
      <div className="smurf-page">
        <h3>{this.state.name}</h3>
        <strong>{this.state.height} tall</strong>
        <p>{this.state.age} smurf years old</p>
      </div>
    );
  }
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;