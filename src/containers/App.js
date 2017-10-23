import React, { Component } from 'react';
import '../styles/App.css';
import ReactDOM from 'react-dom';
// import logo from './logo.svg'; (Example of how to import images)
import { Notes, EmptyContainer } from '../components/Notes';
import Bookmarks from '../components/Bookmarks';
import Googlesearch from '../components/Googlesearch';
import { TodoList } from '../components/todoList.js';

class NotesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      iconLink: './assets/Icons_COLOR-04.png',
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_background-04.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_COLOR-04.png' });
  }

  render() {
    return (<div className="item">
      <a href="#"
        onClick={this.props.clickHandler}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Notes" />
      </a>
      <p>Notes</p>
    </div>
    );
  }
}

class BookmarksButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      iconLink: './assets/Icons_COLOR-05.png',
    };

  }
  toggleVisibility = () => {
    this.setState(prevState => ({ visibility: !prevState.visibility }));
    if (this.state.visibility === true) {
      ReactDOM.render(<Bookmarks />, document.getElementById('bookmarks'));
      tab_open();
    } else {
      ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
      tab_close();
    }
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_background-05.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_COLOR-05.png' });
  }

  render() {
    return (<div className="item">
      <a href="#"
        onClick={this.toggleVisibility}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Bookmarks" />
      </a>
      <p>Bookmarks</p>
    </div>);
  }
}



class TodosButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconLink: './assets/Icons_COLOR-02.png',
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_background-02.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_COLOR-02.png' });
  }

  render() {
    return (<div className="item">
      <a href="#"
        onClick={this.props.clickHandler}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Todos button" />
      </a>
      <p>Todos</p>
    </div>);
  }
}



class GmailButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconLink: './assets/mail.png',
    };
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/mail_hover.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/mail.png' });
  }
  render() {
    return (
      <div className="item">
        <a href="https://accounts.google.com/signin/v2/sl/pwd?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F%3Ftab%3Dwm&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
          onMouseOver={this.iconChangeOnHover}
          onMouseOut={this.iconChangeOnOut} >
          <img src={this.state.iconLink} alt="gmail" />
        </a>
        <p>Gmail</p>
      </div>
    );
  } 
}

class GithubButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconLink: './assets/Icons_COLOR_backgrounds_github.png',
    };
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_backgrounds_github_hover.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_backgrounds_github.png' });
  }
  render() {
    return (
      <div className="item">
        <a href="https://github.com/"
          onMouseOver={this.iconChangeOnHover}
          onMouseOut={this.iconChangeOnOut} >
          <img src={this.state.iconLink} alt="github" />
        </a>
        <p>Github</p>
      </div>
    );
  } 
}

function tab_open() {
  document.getElementById("main").style.marginRight = "300px";
}

function tab_close() {
  document.getElementById("main").style.marginRight = "0%";
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesVisibility: false,
      todovisibility: false
    };
  }

  toggleNotesVisibility = () => {
    const newVisibility = !this.state.notesVisibility;
    this.setState(prevState => ({ notesVisibility: !prevState.notesVisibility }));
    if (newVisibility) {
      ReactDOM.render(<Notes closeHandler={this.toggleNotesVisibility} />, document.getElementById('notes'));
      tab_open();
    } else {
      ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
      tab_close();
    }
  }
  
  toggleTodosVisibility = () => {
      if (this.state.todoVisibility) {
        ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
        tab_close();
        this.setState({todoVisibility: false});
      } else {
      ReactDOM.render(<TodoList closeHandler={this.toggleTodosVisibility} />, document.getElementById('todo'));
      tab_open();
      this.setState({todoVisibility: true});
      }
  }

  render() {
    console.log("render app");
    return (
      <div id="#App" className="App">

        <div className="main">

          <div className="main-top" id="main">

            <div className="time">
              11:45 PM
              </div>

            <div className="search-area">
              {/* <div className="search-type">
                <div className="type-item">Web</div>
                <div className="type-item">Images</div>
                <div className="type-item">News</div>
                <div className="type-item">Videos</div>
                <div className="type-item">Maps</div>
              </div> */}
              <Googlesearch types={['Web', 'Images', 'News', 'Videos', 'Maps']} />
              {/* <div className="search-box">
                  <div className="box-item">Google</div>
                </div> */}
            </div>


            <div id='icons'>
              <div className="main-grid">
                <div className="item">
                  <img src="assets/Icons_COLOR_background-01.png" alt="Weather" />
                  <p>Weather</p>
                </div>
                  <TodosButton clickHandler={this.toggleTodosVisibility}   />
                <div className="item">
                  <img src="assets/Icons_COLOR-03.png" alt="Apps" />
                  <p>Apps</p>
                </div>
                <BookmarksButton />
                <NotesButton clickHandler={this.toggleNotesVisibility} />
                <div className="item">
                  <img src="assets/Icons_COLOR-06.png" alt="History" />
                  <p>History</p>
                </div>
                <GmailButton />
                <GithubButton />
              </div>
            </div>
          </div>

          <div id='tabs'>
            <aside>
              <div id="weather">
              </div>
              <div id="todo">
              </div>
              <div id="apps">
              </div>
              <div id="notes" >
              </div>
              <div id="bookmarks">
              </div>
              <div id="history">
              </div>
              <div id="placeholder1">
              </div>
              <div id="placeholder2">
              </div>
            </aside>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
