import * as React from 'react';
import styles from './HelloWorld.module.scss';
import './HelloWorld.module.css';
import { css } from 'office-ui-fabric-react';
import IHelloWorldProps from './IHelloWorldProps';

export class Hello extends React.Component<IHelloWorldProps, {}> {
    public render(): JSX.Element {

      //TODO Get item here async. Render async instead? Does it matter? Since the entire thing is being loaded async? Should I show blank/blurred card until loaded?

      var item = {
        id: "14",
        picture: "http://via.placeholder.com/500x500",
        title: "First Last",
        jobTitle: "Job Title",
        department: "Department",
        eMail: "email@email.com",
        phone: "555 123 4567",
      };

      return (
        <div className={styles.contactcard}>
          <div className={styles.photo_wrapper}>
            <img className={styles.photo} src={item.picture} alt="Avatar"/>
          </div>

          <div className={styles.details_container}>
            <a href={"/_layouts/15/userdisp.aspx?ID=" + item.id}><h3><b>{item.title}</b></h3></a>
            <div>{item.jobTitle}</div>
            <div><b>{item.department}</b></div>
            <div><a href={"mailto:" + item.eMail}>{item.eMail}</a></div>
            <div>{item.phone}</div>
          </div>
        </div>
      );
  }
}
