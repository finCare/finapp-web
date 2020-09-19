import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
        user: "yyy",
        isMarried: false,
        isSpouseWorking: false,
        disability: "none"
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    console.log(this.props)
    const user  = this.props.auth.users.message;
    console.log(user.firstname)
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
            <b>Hey there,</b> {user.firstname}
              <p className="flow-text grey-text text-darken-1">
                You are now logged in to{" "}
                <span style={{ fontFamily: "monospace" }}>FIN</span>app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
