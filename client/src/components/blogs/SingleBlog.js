import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import '../../App.css';

const SingleBlog = (props) => {
    const  blog  = props.blog;

    const published_date = DateTime.fromISO(blog.published_date);
    const updated_date = DateTime.fromISO(blog.updated_date);

    const date = published_date && (updated_date || published_date).toFormat("yyyy.MM.dd HH:mm")
//  if (a) b
    return(
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={`/show-blog/${blog._id}`}>
                        { blog.title }
                    </Link>
                </h2>
                <p>{blog.description}</p>
                <h2>{date}</h2>
            </div>
        </div>
    )
};

export default SingleBlog;