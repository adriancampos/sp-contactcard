import * as React from 'react';
import styles from './ContactCard.module.scss';
import './ContactCard.module.css';
import { css } from 'office-ui-fabric-react';
import IContactCardProps from './IContactCardProps';

export class ContactCard extends React.Component<IContactCardProps, {id: string, picture: string, picture_desc: string, title: string, jobTitle: string, department: string, eMail: string, phone: string}> {

    constructor(props) {
      super(props);
      // this.state = {
      //   id: "14",
      //   picture: "http://via.placeholder.com/500x500",
      //   picture_desc: "description",
      //   title: "First Last",
      //   jobTitle: "Job Title",
      //   department: "Department",
      //   eMail: "email@email.com",
      //   phone: "555 123 4567",
      // }

      //https://github.com/goatslacker/alt/issues/283#issuecomment-107463147 does this help? not really..
      // this.componentDidMount = this.componentDidMount.bind(this);

      this.state = {
        id: "",
        picture: "",
        picture_desc: "",
        title: "",
        jobTitle: "",
        department: "",
        eMail: "",
        phone: ""
      }

//TODO Neccessary?
      //this._bind('componentDidMount');
      this.componentDidMount = this.componentDidMount.bind(this);



    }

    public render(): JSX.Element {



      // var item = {
      //   id: "14",
      //   picture: "http://via.placeholder.com/500x500",
      //   title: "First Last",
      //   jobTitle: "Job Title",
      //   department: "Department",
      //   eMail: "email@email.com",
      //   phone: "555 123 4567",
      // };



      return (
        <div className={styles.contactcard}>
          <div className={styles.photo_wrapper}>
            <img className={styles.photo} src={this.state.picture} alt="Avatar"/>
          </div>

          <div className={styles.details_container}>
            <a href={"/_layouts/15/userdisp.aspx?ID=" + this.state.id}><h3><b>{this.state.title}</b></h3></a>
            <div>{this.state.jobTitle}</div>
            <div><b>{this.state.department}</b></div>
            <div><a href={"mailto:" + this.state.eMail}>{this.state.eMail}</a></div>
            <div>{this.state.phone}</div>
          </div>
        </div>
      );
  }
  //
  // .then(data => {
  //   let picture = data.results.picture
  //   this.setState({picture: picture});
  //   console.log("state", this.state.picture);
  // })

// http://intranetnew/_api/Web/SiteUserInfoList/Items(14)?$select=Title,Picture,EMail,MobilePhone,Department,JobTitle



  componentDidMount() {

    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://intranetnew/_api/Web/SiteUserInfoList/Items('+this.props.accountid+')?$select=Title,Picture,EMail,MobilePhone,Department,JobTitle');
    // xhr.open(method, url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
           console.log(xhr.responseXML);
            var r = xhr.responseXML;

            console.log(xhr.responseXML.getElementsByTagName('d:Title')[0]);
            console.log(r.getElementsByTagName('d:Title')[0]);
            console.log(r.getElementsByTagName('d:Title')[0].firstChild);
            console.log(r.getElementsByTagName('d:Title')[0].firstChild.nodeValue);

            //TODO Do some error checking. If request succeeds but returns null data, problem

            var picture;
            var picture_desc;
            if (r.getElementsByTagName('d:Picture')[0].hasChildNodes()) {
              console.log("THERE is a picture")
              picture = r.getElementsByTagName('d:Picture')[0].getElementsByTagName('d:Url')[0].firstChild.nodeValue;
              picture_desc = r.getElementsByTagName('d:Picture')[0].getElementsByTagName('d:Description')[0].firstChild.nodeValue;
            } else {
              //No picure defined; Url and Description children don't exist
              //TODO Blank/special photo here? Or let the error handler do that? Or both?
            }


            that.setState({
            //  id: "",
              picture: picture,
              picture_desc: picture_desc,
              title: r.getElementsByTagName('d:Title')[0].firstChild.nodeValue,
              jobTitle: r.getElementsByTagName('d:JobTitle')[0].firstChild.nodeValue,
              department: r.getElementsByTagName('d:Department')[0].firstChild.nodeValue,
              eMail: r.getElementsByTagName('d:EMail')[0].firstChild.nodeValue,
              phone: r.getElementsByTagName('d:MobilePhone')[0].firstChild.nodeValue
            });
        }
        else {
          //TODO Do NOT alert
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
  }


}


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  // } else if (typeof XDomainRequest != "undefined") {
  //
  //   // Otherwise, check if XDomainRequest.
  //   // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
  //   xhr = new XDomainRequest();
  //   xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
