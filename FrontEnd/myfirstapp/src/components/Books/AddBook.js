import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { createBook } from "../../actions/bookActions";
import "../../Stylesheets/AddBook.css";


class AddBook extends Component {

    // Maintain current data in the state
    constructor(props){
        super(props);

        this.state={
            bookName: "",
            author: "",
            isbn: "",
            category: "",
            releaseDate: "",
            page: "",
            bookCoverURL: "",
            unitPrice: "",
            numOfNewBook: "",
            numOfOldBook: "",
            bookErrors: {},
            successMessage: ""
        };

        this.handleNewBook = this.handleNewBook.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Common statement to change state based on the input
    // target.name is the name given to each of the input fields.
    // target.value is what is eneterd by the user
    handleNewBook=(e)=>{
        this.setState({ [e.target.name]: e.target.value })
    };

    // Handling errors upon submission
    componentWillReceiveProps(nextProps) {
        console.log("We Get to componentWillReceiveProps (@AddBooks.js)")
        // console.log("The nextProps are: ", nextProps.numOfBooksErrors);

        // Error for numOfNewBook and numOfOldBook is the same, hence setting numOfBooksErrors with the error only once
        // this.setState({
        //     bookErrors: nextProps.bookErrors,
        // });

        console.log("componentWillReceive: ", nextProps.numBookError)
        // if (Object.keys(nextProps.bookErrors).length == 0)

        if (nextProps.numBookError == "") {
            this.setState({
                bookName: "",
                author: "",
                isbn: "",
                category: "",
                releaseDate: "",
                page: "",
                bookCoverURL: "",
                unitPrice: "",
                numOfNewBook: "",
                numOfOldBook: "",
                bookErrors: {},
                successMessage: "Book successfully added"
            });
        }
    }

    // Handling the submit button
    handleSubmit=(e)=>{
        // Preventing the default action of the form
        e.preventDefault()

        // Creating a new book with the data entered
        const newBook = {
            bookName: this.state.bookName,
            author: this.state.author,
            isbn: this.state.isbn,
            category: this.state.category,
            releaseDate: this.state.releaseDate,
            page: this.state.page,
            bookCoverURL: this.state.bookCoverURL,
            numOfNewBook: this.state.numOfNewBook,
            numOfOldBook: this.state.numOfOldBook,
        }

        // Creating a new book object in the back end
        const isSubmitted = this.props.createBook(newBook);
        console.log("isSubmitted is -----> ", isSubmitted);


        
        console.log("New Book Details: (@AddBook.js)", newBook)
    }


    render() {
        // console.log("---------------------->", this.props);
        // console.log("---------------------->", this.props.numBookError.numOfNewBook);
        
        return (
            
            <div className="container">
                <div className="row">

                    {/* Search bar */}
                    <div className="col-12">
                        <form>
                        <div className="input-group theSearchbarSection">
                            <div className="form-outline">
                                <input className="form-control mr-sm-2 searchbarInputField" type="search" placeholder="Search" aria-label="Search"></input>
                            </div>
                            <button id="search-button" type="submit" className="btn btn-primary"> <i className="fas fa-search searchIcon"></i></button>
                        </div>
                        </form>
                    </div>
                </div>

                
                {/* Displaying message for successful submission */}
                <div className="row mt-3 mb-3">
                    <div className="col-md-6 offset-md-3">
                        <span>{this.state.successMessage != "" ? 
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Notification:</strong> {this.state.successMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> 
                            : <div></div>}
                        </span>
                    </div>
                </div>
                

                {/* Form to add book */}
                <div className="row mt-3 mb-3">
                    <div className="col-md-6 offset-md-3 addBookFormSection">
                        {/* Form heading */}
                        <h1>Add a New Book</h1>

                        {/* Input fields for the form */}
                        <form onSubmit={this.handleSubmit}>
                            <div className= "from-group">
                                <label className="addBookText">Book Name:</label>
                                <input required className= "form-control requiresBottomSpacing" type= "text" name="bookName" placeholder="Book Name" value={this.state.bookName} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Author:</label>
                                <input required className= "form-control requiresBottomSpacing" type= "text" name="author" placeholder="Author's Name" value={this.state.author} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">ISBN:</label>
                                <input required className= "form-control" type= "number" name="isbn" placeholder="ISBN" value={this.state.isbn} onChange={this.handleNewBook} />
                                <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.isbn : null} </small></span>
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Category:</label>
                                <input required className= "form-control requiresBottomSpacing" type= "text" name="category" placeholder="Category (Genre)" value={this.state.category} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Release Date:</label>
                                <input required className= "form-control" type= "date" name="releaseDate" placeholder="Date of Release" value={this.state.releaseDate} onChange={this.handleNewBook} />
                                <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.releaseDate : null} </small></span>
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Pages:</label>
                                <input required className= "form-control" type= "number" name="page" placeholder="Number of pages" value={this.state.page} onChange={this.handleNewBook} />
                                <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.page : null} </small></span>
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Book Cover URL:</label>
                                <input required className= "form-control requiresBottomSpacing" type= "url" name="bookCoverURL" placeholder="URL" value={this.state.bookCoverURL} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group"> 
                                <label className="addBookText">Number of New Books</label>
                                <input required className= "form-control" type= "number" name="numOfNewBook" placeholder="Number of New Books" value={this.state.numOfNewBook} onChange={this.handleNewBook} />
                                <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.numOfNewBook : null} </small></span>
                            </div>

                            <div className= "from-group"> 
                                <label className="addBookText">Number of Old Books</label>
                                <input required className= "form-control" type= "number" name="numOfOldBook" placeholder="Number of Old Books" value={this.state.numOfOldBook} onChange={this.handleNewBook} />
                                <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.numOfOldBook : null} </small></span>
                            </div>

                            {/* Submit button */}
                            <div className="row addBookSubmitButton">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
AddBook.propTypes = {
    createProject: PropTypes.func.isRequired
  };

  const mapStateToProps=(state)=>{
    return {
        numBookError: state.errors.bookErrors
    }
  }
  
  export default connect(
    mapStateToProps,
    { createBook }
  )(AddBook);
