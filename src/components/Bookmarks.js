import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Bookmarks.css';
/* eslint-disable */
let arrayOfBookmarks = [];
// calling google chrome API , pushing data to arrayOfBookmarks variable
chrome.bookmarks.getTree(function (tree) {
  let arrayOfParentFolder = tree[0].children;
  for (var i = 0; i < arrayOfParentFolder.length; i++) {
    arrayOfBookmarks.push({
      parentId: arrayOfParentFolder[i].parentId,
      title: arrayOfParentFolder[i].title,
      children: arrayOfParentFolder[i].children
    });
  }
  // pushing data from google chrome into localStorage
  localStorage.setItem("arrayOfBookmarks", JSON.stringify(arrayOfBookmarks));
});
/* eslint-enable */
// grabbing data from localStorage to use for the rest of the Bookmarks component
const localStorageBookmarks = JSON.parse(localStorage.getItem("arrayOfBookmarks"));
console.log(localStorageBookmarks);

export class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      searchTerm: '',
      searchArray: [],
      searchButton: '../assets/search.png',
      FormattedParentFolder: this.FormattedParentFolder(),
      FormattedChildrenBookmarks: this.FormattedChildrenBookmarks(0)
    }
  }
  setSearchQuery = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  shortenBookmarkTitles = (title, number) => {
    let newTitle = title;
    if (title.length >= number) {
      newTitle = title.slice(0, number) + "...";
    }
    return newTitle
  }

  bookmarksFormatter = (bookmarks) => {
    let newFormattedBookmarks = bookmarks.map((bookmarks, index) =>
      <li className="bookmarks" key={bookmarks.index} style={{ listStyleImage: "url(chrome://favicon/" + bookmarks.url + ")" }}>
        <a href={bookmarks.url}>
          {this.shortenBookmarkTitles(bookmarks.title, 23)}
        </a>
      </li >
    )
    return newFormattedBookmarks;
  }

  handleBookmarksSearch = () => {
    let value = this.state.searchTerm;
    let newSearchArray = [];
    let thisOfSearchArray = this;
    /* eslint-disable */
    chrome.bookmarks.search(value, function (tree) {
      let arrayOfSearchResults = tree;
      console.log("arrayOfSearchResults are " + arrayOfSearchResults)
      for (var i = 0; i < arrayOfSearchResults.length; i++) {
        newSearchArray.push({
          title: arrayOfSearchResults[i].title,
          url: arrayOfSearchResults[i].url,
          iconurl: "chrome://favicon/" + arrayOfSearchResults[i].url
        });
      }
      console.log("state searchArray is " + newSearchArray);
      thisOfSearchArray.setState({ searchArray: thisOfSearchArray.bookmarksFormatter(newSearchArray) });
    });  
    /* eslint-enable */

    if (this.state.searchTerm === '') {
      return null;
    } else if (this.setState({ searchButton: '../assets/search – 2.png' })) {
      this.setState({ searchButton: "../assets/search.png" });
      this.setState({ searchTerm: "" });
      this.setState({ searchArray: [] });
    } else {
      (this.state.searchButton === '../assets/search.png') ? this.setState({ searchButton: '../assets/search – 2.png' }) : this.setState({ searchButton: "../assets/search.png" });
    }
    return <div className="bookmarkList">{this.bookmarksFormatter(this.state.searchArray)}</div>;
  }

  FormattedChildrenBookmarks = (index = 0) => {
    // iterating through parent folders and looking at all the children inside each parentFolder
    let parentFolderIndex = index;
    if (localStorageBookmarks[parentFolderIndex] === undefined || localStorageBookmarks[parentFolderIndex] === null) {
      parentFolderIndex = 0;
    }
    console.log("parentFolderIndex is " + parentFolderIndex);
    let maplistOfChildrenBookmarks = localStorageBookmarks[parentFolderIndex].children
    let listOfChildrenBookmarks = this.bookmarksFormatter(maplistOfChildrenBookmarks);
    // console.log("listOfChildrenBookmarks is " + listOfChildrenBookmarks);
    let result = (<ul className="bookmarkList">{listOfChildrenBookmarks}</ul>)
    this.setState({ FormattedChildrenBookmarks: result });
  }

  FormattedParentFolder = () => {
    let listOfParentFolders = localStorageBookmarks.map((parentFolder, index) =>
      <div>
        <a className="bookmarkParentFolder" key={index} onClick={() => this.FormattedChildrenBookmarks(index)}>
          {parentFolder.title}
        </a>
        <br />
      </div>
    );
    this.setState({ FormattedChildrenBookmarks: this.FormattedChildrenBookmarks(0) });
    return <div className="listOfBookmarkFolders">{listOfParentFolders}</div>;
  }

  render() {
    return (
      <div>
        {/* HEADER */}
        <div className='Bookmarks-Header'>
          <button className='bookmarksExitButton' onClick={this.props.closeHandler}>X</button>
          <h1 className='Bookmarks-Title-Text'>Bookmarks</h1>
        </div>
        {/* BODY */}
        <div className='Bookmarks-Body'>
          {/* SEARCH FEATURE */}
          <div class="searchBookmarksBackground">
            <textarea onChange={this.setSearchQuery} className='SearchBox SearchBoxText' required placeholder="Search Something" />
            <a><img className='searchButton' onClick={this.handleBookmarksSearch} src={this.state.searchButton} alt="search"></img></a>
            {this.state.searchArray}
          </div>
          {/* BOOKMARKS LIST */}
          <section className="BookmarksListBody">
            {this.state.FormattedParentFolder}
            {this.state.FormattedChildrenBookmarks}
          </section>
        </div> {/* END OF BODY */}
      </div>
    );
  }
}
