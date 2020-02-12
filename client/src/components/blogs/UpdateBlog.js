import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { protectedGet } from '../../helpers/request'
import { protectedPut } from '../../helpers/request'


class UpdateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      author: '',
      description: '',
      updated_date: '',
      charLeft: 2000,
    };
  }

  componentDidMount() {
    console.log("Print id: " + this.props.match.params.id);
    protectedGet('http://localhost:8082/api/blogs/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, blog: res.data})
        this.setState({
          title: res.data.title,
          content: res.data.content,
          author: res.data.author,
          description: res.data.description,
          updated_date: res.data.updated_date,
        })
      })
      .catch(err => {
        console.log("Error from UpdateBlog");
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onContentChange = e => {
    this.setState({ content: e.target.value, charLeft: 2000 - e.target.value.length });
  }

  blogUpdate = () => {
    const username = sessionStorage.getItem('username');
    if(username == this.state.author) {
      protectedPut('http://localhost:8082/api/blogs/' + this.props.match.params.id, {
        ...this.state
      })
      .then(res => {
        this.props.history.push('/show-blog/' + this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in update blog");
      });
    } else {
      alert("You are not admin of this blog!");
    }

  };

  onSubmit = e => {
    e.preventDefault();
    this.blogUpdate();
  }


  render() {
    return (
      <div className="UpdateBlog">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Blog List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Blog</h1>
              <p className="lead text-center">
                  Update Blog's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">Title</label>
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
                rows='8'
                className='form-control'
                value={this.state.content}
                onChange={this.onContentChange}
              />
            </div>

            <div>{this.state.charLeft}</div>

            <div className='form-group'>
            <label htmlFor="description">Description</label>
              <input
                type='text'
                placeholder='Describe this blog'
                name='description'
                className='form-control'
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Blog</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateBlog;