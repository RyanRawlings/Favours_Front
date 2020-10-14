import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavMenu from "../../components/navMenu/index";
import UploadImage from "../../components/uploadImage/index";
import * as UserAPI from "../../api/UserAPI";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    margin: "2px"
  },
  icons: {
    transform: "translateY(-0.1em)"
  },
  largeIcon: {
    margin: "auto",
    width: "50%",
    height: "60%"
  },
  profileCard: {
    margin: "0% 0% 0% 2%",
    width: "25%",
    float: "left"
  },
  profileCardContent: {
    height: "40vh"
  },
  personalDetailsCard: {
    margin: "3% 2% 2% 2%",
    height: "80vh"
  },
  avatar: {
    marginTop: "10%",
    height: "100px",
    width: "100px"
  }
}));

export default function Profile(props) {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const classes = useStyles();
  const [personalDetails, setPersonalDetails] = useState({});

  useEffect(() => {
    async function userDetailData() {
      const userDetailData = await UserAPI.getUserDetails();
      console.log("allUserDetailData+++++", userDetailData.result);
      setPersonalDetails(userDetailData.result[0]);
    }

    userDetailData();
  }, []);
  console.log("personalDetails:", personalDetails);
  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.root}>
      <div className="container">
        <NavMenu props={props} />
        <div className="container_right">
          <Paper className={classes.container}>
            <div className="container_right_bottom">
              <Card className={classes.profileCard}>
                <CardContent className={classes.profileCardContent}>
                  <Avatar className={classes.avatar}>
                    <UploadImage />
                  </Avatar>
                  Click to upload a Profile Image
                  <table>
                    <tbody>
                      <tr>
                        <td>Hello {personalDetails.firstname}</td>
                      </tr>
                      <tr>
                        <td>Have a nice day at work :)</td>
                      </tr>
                      <tr>
                        <td>
                          Group:
                          {personalDetails.group
                            ? personalDetails.group.group_name
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Department:
                          {personalDetails.group
                            ? personalDetails.group.department
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              <Card className={classes.personalDetailsCard}>
                <CardContent className={classes.personalDetailsCardContent}>
                  Lastedt activity
                  <Card>
                    <CardContent>get dfrom</CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
