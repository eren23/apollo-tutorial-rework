import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Moment from "react-moment";
import Loader from "react-loader-spinner";
import Footer from "./Footer";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
      links {
        mission_patch
        mission_patch_small
        article_link
        video_link
      }
      details
    }
  }
`;

const Launch = (props) => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });
  if (loading)
    return (
      <Loader
        type="Grid"
        color="grey"
        height={100}
        width={100}
        timeout={3000} //3 secs
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      />
    );
  if (error) return <p>Error.</p>;
  const {
    mission_name,
    //flight_number,
    launch_year,
    launch_success,
    launch_date_local,
    rocket: { rocket_id, rocket_name, rocket_type },
    links: { mission_patch, mission_patch_small, article_link, video_link },
    details,
  } = data.launch;
  return (
    <div>
      <h1 className="display-4 my-3">
        {" "}
        <span className="text-dark"> Mission:</span> {mission_name}
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Flight Number: {flight_number}</li>
        <li className="list-group-item">Launch Year {launch_year}</li>
        <li className="list-group-item">
          Local Launch Date:{" "}
          <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
        </li>
        <li className="list-group-item">
          Launch Succes:{" "}
          <span
            className={classNames({
              "text-success": launch_success,
              "text-danger": !launch_success,
            })}
          >
            {launch_success ? "Yes" : "No"}
          </span>
        </li>
      </ul>
      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item ">Rocket ID: {rocket_id}</li>
        <li className="list-group-item">Rocket Name: {rocket_name}</li>
        <li className="list-group-item">Rocket Type: {rocket_type}</li>
      </ul>
      <h4 className="my-3">Some Links</h4>
      <ul className="list-group">
        {mission_patch ? (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Missin Patch High Res:
            <a href={mission_patch} target="_blank" rel="noopener noreferrer">
              <button type="button" class="btn btn-secondary">
                {mission_patch}
              </button>
            </a>
          </li>
        ) : (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ background: "#242038", color: "white" }}
          >
            NO MISSION PATCH RES
          </li>
        )}
        {mission_patch_small ? (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Mission Patch Low Res:
            <a
              href={mission_patch_small}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" class="btn btn-secondary">
                {mission_patch_small}
              </button>
            </a>
          </li>
        ) : (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ background: "#242038", color: "white" }}
          >
            NO MISSION LOW PATCH RES
          </li>
        )}
        {article_link ? (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Article Link:
            <a href={article_link} target="_blank" rel="noopener noreferrer">
              {" "}
              <button type="button" class="btn btn-secondary">
                {article_link}
              </button>
            </a>
          </li>
        ) : (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ background: "#242038", color: "white" }}
          >
            NO ARTICLE LINK
          </li>
        )}
        {mission_patch ? (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Rocket Launch Video
            <a href={video_link} target="_blank" rel="noopener noreferrer">
              {" "}
              <button type="button" class="btn btn-secondary">
                {video_link}
              </button>
            </a>
          </li>
        ) : (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ background: "#242038", color: "white" }}
          >
            NO ROCKET LAUNCH VIDEO
          </li>
        )}
      </ul>
      <h4 className="my-3">Launch Details</h4>
      <div className="w-100">
        {/* <p>
          <span
            className={classNames({
              "alert alert-dismissible alert-success": launch_success,
              "alert alert-dismissible alert-danger": !launch_success,
            })}
          >
            <strong>{details}</strong>
          </span>
        </p> */}
        {/* {details && launch_success ? (
          <table className="table table-hover ">
            <tbody>
              <tr className="table-success ">
                <th scope="row">SUCCESS</th>
                <td>REPORT:</td>
                <td>{details}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="table table-hover ">
            <tbody>
              <tr className="table-danger ">
                <th scope="row">FAILED</th>
                <td>REPORT:</td>
                <td>{details}</td>
              </tr>
            </tbody>
          </table>
        )} */}

        {launch_success ? (
          <table className="table table-hover ">
            <tbody>
              <tr className="table-success ">
                <th scope="row">SUCCESS</th>
                <td>REPORT:</td>
                <td>{details ? details : <p>No Reports Published</p>}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="table table-hover ">
            <tbody>
              <tr className="table-danger ">
                <th scope="row">FAILED</th>
                <td>REPORT:</td>
                <td>{details ? details : <p>No Reports Published</p>}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <hr />
      <Link to="/" className="btn btn-secondary my-3 mb-3">
        Back
      </Link>
      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light rounded d-flex justify-content-between align-items-center">
        <a
          class="navbar-brand"
          href="http://www.akbuluteren.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link to Developer's Website
        </a>
        <p className="text-muted my-1 hover">2020 Made by Eren Akbulut</p>
      </nav> */}
      <Footer />
    </div>
  );
};

export default Launch;
