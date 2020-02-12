import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import { protectedGet } from '../../helpers/request'
import { protectedDelete } from '../../helpers/request'
import { DateTime } from 'luxon';

class ShowBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    protectedGet('http://localhost:8082/api/blogs/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-ShowBlog-API-response: " + res.data);
        this.setState({
          blog: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowBlog");
      })
  };

  onDeleteClick(id) {
    const username = sessionStorage.getItem('username');
    if(true || username == this.state.blog.author){
      protectedDelete('http://localhost:8082/api/blogs/'+id, +this.props.match.params.id)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('Error on ShowBlog_deleteClick');
      })
    } else {
      alert("You are not admin of this blog!");
    }
  };

  render() {
    const blog = this.state.blog;
    const published_date = DateTime.fromISO(blog.published_date);
    const updated_date = DateTime.fromISO(blog.updated_date);
    const date = published_date && (updated_date || published_date).toFormat('yyyy.MM.dd HH:mm');
    let BlogItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ blog.title }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{ blog.author }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>content</td>
            <td>{ blog.content }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Date</td>
            <td>{ date }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Description</td>
            <td>{ blog.description }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowBlog">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Blog List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Blog's Record</h1>
              <p className="lead text-center">
                  View Blog's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { BlogItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,blog._id)}>Delete Blog</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-blog/${blog._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit Blog
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Blog</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Blog</button> */}

        </div>
      </div>
    );
  }
}

export default ShowBlog;