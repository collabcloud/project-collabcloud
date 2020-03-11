import React from "react";
import { Link } from "react-router-dom";


const ThreadOverview = (props) => (
  <tr>
  <td className="text-left">
    <Link to={props.path}>{props.title}</Link>
    <p>{props.submitter} - {props.createdAt}</p>
  </td>
  <td className="text-center">
    <p>Replies: {props.replies}</p>
    <p>Views: {props.views}</p>
  </td>
  <td className="text-right">
    <p>Last Updated: {props.modifiedAt}</p>
    <p>Submitter: {props.recent}</p>
  </td>
</tr>
);

export default ThreadOverview;
