import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title , description, imageUrl, newsUrl, author, newsDate, source} = this.props;
    return (

        <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex:1}}>
                {source.name}
                <span className="visually-hidden">unread messages</span>
            </span>
            <img src={imageUrl} className="card-img-top" alt="Images Name"/>
            <div className="card-body">
                <h5 className="card-title">{title}....</h5>
                <p className="card-text">{description}....</p>
                <p className="card-text"><small className="text-body-secondary">By <b><u>{author? author: "Unknown"} </u> </b> On {new Date(newsDate).toString()} </small></p>
                <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
    )
  }
}

export default NewsItem
