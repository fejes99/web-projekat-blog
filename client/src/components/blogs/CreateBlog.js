import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

class CreateBlog extends Component {
    constructor() {
      super();
      this.state = {
        title: '',
        content:'',
        author:'',
        description:'',
        charLeft: 2000,
      };
    }
  
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    onContentChange = e => {
      this.setState({ content: e.target.value, charLeft: 2000 - e.target.value.length });
    }
  
    onSubmit = e => {
      e.preventDefault();
  
      const username = sessionStorage.getItem('username');

      const data = {
        title: this.state.title,
        content: this.state.content,
        author: username,
        description: this.state.description,
      };
  

      axios
        .post('http://localhost:8082/api/blogs', data)
        .then(res => {
          this.setState({
            title: '',
            content:'',
            author: '',
            description:'',
          })
          this.props.history.push('/');
        })
        .catch(err => {
          console.log("Error in CreateBlog!");
        })
    };
  
    render() {
      return (
        <div className="CreateBlog">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
                <Link to="/" className="btn btn-outline-warning float-left">
                    Show Blog List
                </Link>
              </div>
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add Blog</h1>
                <p className="lead text-center">
                    Create new blog
                </p>
  
                <form noValidate onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Title of the Blog'
                      name='title'
                      className='form-control'
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                  </div>
                  <br />
  
                  <div className='form-group'>
                    <textarea
                      placeholder='Content'
                      name='content'
                      rows="8"
                      className='form-control'
                      value={this.state.content}
                      onChange={this.onContentChange}
                    />
                  </div>

                  <div>{this.state.charLeft}</div>
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Describe this blog'
                      name='description'
                      className='form-control'
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </div> 
                  <input
                      type="submit"
                      className="btn btn-outline-warning btn-block mt-4"
                  />
                </form>
            </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default CreateBlog;