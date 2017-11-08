import React  from 'react';
import '../styles/AppsTab.css';



// *** get the initial app/extension list ***
const appList = [];
const appListDisableEnable = [];
const extensionList = [];
const extensionListDisableEnable = [];

/* eslint-disable */
chrome.management.getAll(function(info) {
  for (var i = 0; i < info.length; i++) {
    // TODO isApp is depreciated so maybe change to type
    if (info[i].isApp) {
      appList.push(info[i]);
      appListDisableEnable.push(info[i].enabled);
    }
    // for now do not include our own extension cause can not access icon to display 
    else if (info[i].name == "TurtleTab") {
      continue;
    }
    else{
      extensionList.push(info[i]);
      extensionListDisableEnable.push(info[i].enabled);
    }
  }
});
/* eslint-enable */

class AppsTabEnableDisableButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            mouseHover: false,
        };
    }	
    onMouseEnter = () => {
        this.setState({mouseHover: true});
    }
    onMouseLeave = () => {
        this.setState({mouseHover: false});
    }
    render() {
        // check the checkbox when mouse hover over
        var trashIconSize;
        if (this.state.mouseHover) {
            trashIconSize = "26"
        }
        else {
            trashIconSize = "22"
        }

        var text;
        var colorEnabled;
        if (this.props.enable) {
          text = "Disable";
          colorEnabled = "AppsTabButtonEnabled";

        }
        else {
          text = "Enable";
          colorEnabled = "AppsTabButtonDisabled";
        }

        return (
          <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <p className={colorEnabled}>{text}</p>
          </div>
        );
    }
}


class AppsTabTrashImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            mouseHover: false,
        };
    }	
    onMouseEnter = () => {
        this.setState({mouseHover: true});
    }
    onMouseLeave = () => {
        this.setState({mouseHover: false});
    }
    render() {
        // check the checkbox when mouse hover over
        var trashIconSize;
        if (this.state.mouseHover) {
            trashIconSize = "26"
        }
        else {
            trashIconSize = "22"
        }

        return (
          <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <img src={require("./../assets/trashAppsTab.png")}  alt="trash icon" width={trashIconSize} /> 
          </div>
        );
    }
}



class AppsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          appList: appList,
          appListDisableEnable: appListDisableEnable,
          extensionList: extensionList,
          extensionListDisableEnable: extensionListDisableEnable
        }
      }
      test = (event) => {
        alert("test here");
        event.preventDefault();
      }
      clickDeleteIcon = (elm, i, event) => {
        alert("Clicked delete icon. Work in progress not finish");
        alert(elm);
        alert(elm.name);
        alert(i);
        event.preventDefault();
      }
      clickEnableDisableApp = (elm, i, event) => {
        var arr = this.state.appListDisableEnable.slice();
        arr[i] = !arr[i];
        this.setState({appListDisableEnable: arr});
        /* eslint-disable */
        chrome.management.setEnabled(elm.id, arr[i]);
        /* eslint-enable */
        event.preventDefault();

      }
      clickEnableDisableExt = (elm, i, event) => {
        var arr = this.state.extensionListDisableEnable.slice();
        arr[i] = !arr[i];
        this.setState({extensionListDisableEnable: arr});
        /* eslint-disable */
        chrome.management.setEnabled(elm.id, arr[i]);
        /* eslint-enable */
        event.preventDefault();
      }




  render() {
    return (
            <div>
              {/* HEADER */}
              <div className='Apps-Header'>
                <button className='AppsExitButton' onClick={this.props.closeHandler}>X</button>
                <h2 className='AppsTab-Title-Text'>Apps</h2>
              </div>
              <div className='Apps-Body'>
              <div class="AppsTab-add-to-body">
                <h2 onClick={this.test}>apps:</h2>


                <h2>extensions:</h2>

              </div>



            </div>
          </div>
        );
      }
}

export default AppsTab;
