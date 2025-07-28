import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 6,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor() {
    super();
    
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: false,
    };
   
  }

  async updateNews(){
    this.setState({ laoding: true });
    // Darshan APi Key : 41363d0d76ab4c08a6ea15df1d8ec718
    let apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=41363d0d76ab4c08a6ea15df1d8ec718&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      laoding: false,
    });
  }

  async componentDidMount() {
    this.setState({ laoding: true });
    this.updateNews();
  }

  handlePreviousClick = async () => {
      this.setState( (prevState) => ({ page: prevState.page - 1 }), () => {
        this.updateNews();
      });
  }

  handleNextClick = async () => {
      this.setState( (prevState) => ({page: prevState.page + 1 }),() => {
        this.updateNews();
      })
  }

  /* async componentDidMount() {
    this.setState({ laoding: true });
    let apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=41363d0d76ab4c08a6ea15df1d8ec718&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      laoding: false,
    });
  }
  

  handlePreviousClick = async () => {
    if (this.state.page > 1) {
      this.setState({ laoding: true });
      let apiUrl = `https://newsapi.org/v2/top-headlines?category=${
        this.props.category
      }&country=${
        this.props.country
      }&apiKey=41363d0d76ab4c08a6ea15df1d8ec718&page=${
        this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(apiUrl);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        page: this.state.page - 1,
        laoding: false,
      });
    }
  };

  handleNextClick = async () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      this.setState({ laoding: true });
      let apiUrl = `https://newsapi.org/v2/top-headlines?category=${
        this.props.category
      }&country=${
        this.props.country
      }&apiKey=41363d0d76ab4c08a6ea15df1d8ec718&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(apiUrl);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        totalResults: parsedData.totalResults,
        laoding: false,
      });
    }
  }; */

  render() {
    return (
      <div>
        <div className="container my-3">
          <h2>News Monkey - Top Headlines</h2>
          {this.state.laoding && <Spinner />}
          <div className="row my-2">
            {!this.state.laoding &&
              this.state.articles.map((article) => (
                <div key={article.url} className="col-md-4 my-2">
                  <NewsItem
                    title={article.title ? article.title.slice(0, 60) : ""}
                    description={
                      article.description
                        ? article.description.slice(0, 130)
                        : ""
                    }
                    imageUrl={
                      article.urlToImage
                        ? article.urlToImage
                        : "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iRmSqKMaOels/v1/1200x800.jpg"
                    }
                    newsUrl={article.url}
                    author={article.author}
                    newsDate={article.publishedAt}
                    source={article.source}
                  />
                </div>
              ))}
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
            //   disabled={this.state.page - 1 <= 0}
              disabled={this.state.page === 1}
              onClick={this.handlePreviousClick}
              className="btn btn-dark"
            >
              {" "}
              &larr; Previous
            </button>
            <button
              type="button"
              /* disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              } */
              disabled={
                this.state.page ===  Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
