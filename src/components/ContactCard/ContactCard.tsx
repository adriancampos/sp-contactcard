import * as React from 'react';
import styles from './ContactCard.module.scss';
import './ContactCard.module.css';
import { css } from 'office-ui-fabric-react';
import IContactCardProps from './IContactCardProps';

const icon_people_blur = require('./images/icon-people-square-blur.svg');
const invalid_picture = require('./images/icon-people-square.svg');
const invalid_picture_desc = "No photo";

export class ContactCard extends React.Component<IContactCardProps, {picture: string, picture_desc: string, title: string, jobTitle: string, department: string, eMail: string, phone: string}> {

    constructor(props) {
      super(props);

      // Default state properties
      this.state = {
        picture: icon_people_blur,
        picture_desc: "",
        title: "",
        jobTitle: "",
        department: "",
        eMail: "",
        phone: ""
      }

      this.componentDidMount = this.componentDidMount.bind(this);
    }

    public render(): JSX.Element {
      return (
        <div className={styles.contactcard}>
          <a href={"/_layouts/15/userdisp.aspx?ID=" + this.props.accountid}>
            <img className={styles.photo} src={this.state.picture} alt="Avatar"/>
            <h3><b>{this.state.title}</b></h3>
          </a>
          <div>{this.state.jobTitle}</div>
          <div><b>{this.state.department}</b></div>
          <div><a href={"mailto:" + this.state.eMail}>{this.state.eMail}</a></div>
          <div>{this.state.phone}</div>
        </div>
      );
  }

  
  componentDidMount() {
    // Set up url to call
    const root = ""; // TODO: Set to "http://intranetnew" when in dev environment?
    if (this.props.accountname != null) {
      const api = "/_api/web/lists/getbytitle('User%20Information%20List')/items?$select=Title,Picture,EMail,MobilePhone,Department,JobTitle&$filter=Name eq ";
      const usernameprefix = "i%3A0%23.w%7C"; // Encoded 'i:0#.w|'
      var username = this.props.accountname;  // In the form of 'domain\user'
      var url = root + api + "'" + usernameprefix + encodeURIComponent(username) + "'";
    } else {
      var url = root + '/_api/Web/SiteUserInfoList/Items('+this.props.accountid+')?$select=Title,Picture,EMail,MobilePhone,Department,JobTitle'
    }

    // Call it, parse the data
    var main_this = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Parse xhr.responseXML
        //console.log(xhr.responseXML); // For debug
        var r = xhr.responseXML;

        var picture;
        var picture_desc;
        if (r.getElementsByTagName('d:Picture')[0].hasChildNodes()) {
          picture = r.getElementsByTagName('d:Picture')[0].getElementsByTagName('d:Url')[0].firstChild.nodeValue;
          picture_desc = r.getElementsByTagName('d:Picture')[0].getElementsByTagName('d:Description')[0].firstChild.nodeValue;
        } else {
          //No picure defined; Url and Description children don't exist. Show an embedded "invalid" picture instead.
          picture = invalid_picture;
          picture_desc = invalid_picture_desc;
        }


        main_this.setState({
          picture: picture,
          picture_desc: picture_desc,
          title: getElementValueSafe(r, "Title"),
          jobTitle:getElementValueSafe(r, "JobTitle"),
          department: getElementValueSafe(r, "Department"),
          eMail:getElementValueSafe(r, "EMail"),
          phone: getElementValueSafe(r, "MobilePhone")
        });
      }
      else {
        //TODO Better error handling
        console.log('Request failed.  Returned status of ' + xhr.status);

        main_this.setState({
          picture: icon_people_blur,
          picture_desc: invalid_picture_desc,
          title: "Invalid",
          jobTitle: "\xa0",
          department: "\xa0",
          eMail: "\xa0",
          phone: "\xa0"
        });
      }
    };
    xhr.send();
  }
}

/**
 * Safely gets nodeValue from a potentially null element in responseXML
 * @param responseXML 
 * @param tagname tag to search for with getElementsByTagName()
 */
function getElementValueSafe(responseXML, tagname) {
  var element = responseXML.getElementsByTagName('d:' + tagname)[0];
  if (element.hasChildNodes()) {
    return element.firstChild.nodeValue;
  } else {
    return "\xa0"; //Non-breaking space so that cards remain the same height
  }
}
