import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import SingleBlog from './SingleBlog';
import AuthHeader from '../AuthHeader';

class ShowBlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/blogs')
      .then(res => {
        this.setState({
          blogs: res.data
        })
      })
      .catch(err => {
        console.log('Error from ShowBlogList');
      })
  };

  signOut = () => {
    sessionStorage.clear();
    window.location.reload();
  }


  render() {
    const token = sessionStorage.getItem('token');
    const blogs = this.state.blogs;
    console.log("PrintBlog: " + blogs);
    // let blogList;

    // if(!blogs) {
    //   blogList = "there is no blog record!";
    // } else {
    //   blogList = blogs.map((blog, k) =>
    //     <SingleBlog blog={blog} key={k} />
    //   );
    // }

    return (
        <div className="ShowBlogList">
          <AuthHeader></AuthHeader>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <br />
                <h2 className="display-4 text-center">Blogs List</h2>
                <br />
              </div>

              <div className="col-md-11">
                <Link to="/create-blog" className="btn btn-outline-warning float-right">
                  + Add New Blog
                </Link>
                
                {!token 
                ? 
                <>
                  <Link to="/login" className="btn btn-outline-warning float-left">
                    Login
                  </Link>
                  
                  <Link to="/register" className="btn btn-outline-warning float-left">
                    Register
                  </Link>
                </> : 
                <button onClick={this.signOut} className="btn btn-outline-warning float-left">
                  Sign out
                </button>
                }
                <br />
                <br />
                <br />
                <hr />
              </div>
            </div>

            <div className="list">
              {blogs.length > 0
                ? blogs.map(blog => <SingleBlog blog={blog} key={blog._id} />)
                : <div key="no-key-here">No blogs yet :( </div> 
              }
            </div>
          </div>
        </div>
    );
  }
}

export default ShowBlogList;