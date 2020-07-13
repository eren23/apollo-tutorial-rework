import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";
import Loader from "react-loader-spinner";
import Footer from "./Footer";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
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
  return (
    <Fragment>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {data.launches.map((launch) => (
        <LaunchItem key={launch.flight_number} launch={launch} />
      ))}
      <Footer />
    </Fragment>
  );
};

export default Launches;
