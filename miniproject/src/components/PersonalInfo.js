import React from "react";
import InputElement from "./InputElement";

class PersonalInfo extends React.Component {
  render() {
    return (
      <div className="personal-info">
        <div className="name-area">
          <InputElement text="Full Name" class="firstName" />
        </div>
        <div className="other-personal-area">
          <InputElement text="Address Line 1" class="address" />
          <InputElement text="Address Line 2" class="address" />
          <InputElement text="City, State, Zipcode" class="cityzip" />
          <InputElement text="Phone" class="phone" />
          <InputElement text="Email" class="email" />
        </div>
      </div>
    );
  }
}

export default PersonalInfo;
