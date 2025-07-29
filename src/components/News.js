import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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

  constructor(props) {
    super(props);
    
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: true,
    };
    document.title = `${this.capitelizeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async updateNews(){
    this.props.setProgress(10);
    // this.setState({ loading: true });
    // APi Key : 253f697cb69d4e51807f44ae234e6002 / Vips Key :  41363d0d76ab4c08a6ea15df1d8ec718
    let apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=253f697cb69d4e51807f44ae234e6002&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
    
  }

  async componentDidMount() {
    this.setState({ loading: false });
    this.updateNews();
  }

 /*  handlePreviousClick = async () => {
      this.setState( (prevState) => ({ page: prevState.page - 1 }), () => {
        this.updateNews();
      });
  }

  handleNextClick = async () => {
      this.setState( (prevState) => ({page: prevState.page + 1 }),() => {
        this.updateNews();
      })
  } */

  capitelizeFirstLetter = (string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchMoreData = async () => {

    const nextPage = this.state.page + 1;

    this.setState({page: nextPage });
    
    let apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=253f697cb69d4e51807f44ae234e6002&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });

    console.log("article lenght "+this.state.articles.length);
    console.log("totalResults lenght "+this.state.totalResults);

  };

  /* async componentDidMount() {
    this.setState({ loading: true });
    let apiUrl = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=41363d0d76ab4c08a6ea15df1d8ec718&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  

  handlePreviousClick = async () => {
    if (this.state.page > 1) {
      this.setState({ loading: true });
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
        loading: false,
      });
    }
  };

  handleNextClick = async () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      this.setState({ loading: true });
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
        loading: false,
      });
    }
  }; */

  render() {
    return (
      <>
        
          <h2 className="text-center my-2">News Monkey - Top {this.capitelizeFirstLetter(this.props.category)} Headlines</h2>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            // hasMore={this.state.articles.length !== this.state.totalResults}
            hasMore={this.state.page !==  Math.ceil(this.state.totalResults / this.props.pageSize)}
            loader={ <Spinner/>}
          >
          <div className="container my-3">
            <div className="row my-2">
              {this.state.articles.map((article) => (
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
          </div>
          </InfiniteScroll>
          {/* <div className="d-flex justify-content-between" style={{display:"none !important"}}>
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
              // disabled={
              //   this.state.page + 1 >
              //   Math.ceil(this.state.totalResults / this.props.pageSize)
              // }
              disabled={
                this.state.page ===  Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div> */}
     
      </>
    );
  }
}

export default News;
