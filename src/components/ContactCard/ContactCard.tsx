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
    var main_this = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://intranetnew/_api/Web/SiteUserInfoList/Items('+this.props.accountid+')?$select=Title,Picture,EMail,MobilePhone,Department,JobTitle');
    xhr.onload = function() {
        if (xhr.status === 200) {
           console.log(xhr.responseXML);
            var r = xhr.responseXML;

            var picture;
            var picture_desc;
            if (r.getElementsByTagName('d:Picture')[0].hasChildNodes()) {
              console.log("THERE is a picture")
              picture = r.getElementsByTagName('d:Picture')[0].getElementsByTagName('d:Url')[0].firstChild.nodeValue;
              picture_desc = r.getElementsByTagName('d:Picture')[0].getElementsByTagName('d:Description')[0].firstChild.nodeValue;
            } else {
              //No picure defined; Url and Description children don't exist
              //TODO Blank/special photo here? Or let the error handler do that? Or both?
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
            //  id: "",
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
