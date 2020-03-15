import React from "react";
import { Link } from "react-router-dom";

//TODO: add in modified, replies, views, recent

const ThreadOverview = props => (
  <tr>
    <td className="text-left">
      <Link to={props.path}>{props.title}</Link>
      <p>
        {props.submitter} - {props.createdAt}
      </p>
    </td>
    <td className="text-center">
      <p>Replies: 1</p>
      <p>Views: 4</p>
    </td>
    <td className="text-right">
      <p>Last Updated: March 13th</p>
      <p>Submitter: bajajrah</p>
    </td>
  </tr>
);

export default ThreadOverview;
