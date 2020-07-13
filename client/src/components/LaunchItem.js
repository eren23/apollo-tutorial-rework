import React from "react";
import Moment from "react-moment";
import classNames from "classnames";
import { Link } from "react-router-dom";

const LaunchItem = ({
  launch: { flight_number, mission_name, launch_date_local, launch_success },
  // key,
}) => {
  //   console.log(launch);
  return (
    <div className="card card-cody mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4 className="ml-2">
            Mission Number {flight_number}:{" "}
            <span
              className={classNames({
                "text-success": launch_success, //if launch succes is true add this class
                "text-danger": !launch_success,
              })}
            >
              {mission_name}
            </span>
          </h4>
          <p className="ml-2 mt-1 mb-1">
            Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
          </p>
        </div>
        <div className="col-md-3 mt-3">
          <Link to={`/launch/${flight_number}`} className="btn btn-secondary">
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaunchItem;
