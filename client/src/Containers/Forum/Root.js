import React, { useState, useEffect } from "react";
import { Container, Col, Breadcrumb } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { IoIosChatboxes, IoMdPersonAdd } from "react-icons/io";
import { FaRegNewspaper, FaBug } from "react-icons/fa";
import { NavigationBar } from "../../components/base/NavigationBar";
import SubforumOverview from "../../components/specialized/Forum/SubforumOverview";

import { get_subforums, post_subforum } from "../../actions/forumActions";

//TODO: Figure out icons
//Sometimes only pulls 3?

const Root = withRouter(({ get_subforums, subforums, post_subforum }) => {
  const [subforumsList, setSubforumsList] = useState([]);
  const icons = [IoIosChatboxes, FaRegNewspaper, FaBug, IoMdPersonAdd];

  useEffect(() => {
    /*
    post_subforum(
      "General",
      "Chat about anything from the daily news to the latest fashion"
    );

    post_subforum("Hacker News", "The latest tech industry news stories");
    post_subforum(
      "Bug Bounties",
      "Help fellow CollabClouders with syntax, runtime, logic errors and more"
    );
    post_subforum("Collabs", "View projects seeking collaborators");
      */
    get_subforums();
  }, []);

  useEffect(() => {
    setSubforumsList(subforums);
  }, [subforums]);

  function generateURL(title) {
    return "/forum/" + title.toLowerCase().replace(" ", "-");
  }

  return (
    <div>
      <NavigationBar />
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex flex-column">
          {subforumsList.map((subforum, index) => (
            <SubforumOverview
              key={index}
              path={generateURL(subforum.title)}
              title={subforum.title}
              description={subforum.description}
              icon={icons[index]}
            />
          ))}
        </div>
      </Container>
    </div>
  );
});

function mapStateToProps(state) {
  console.log(state.forum.subforums);
  return { subforums: state.forum.subforums };
}

function mapDispatchToProps(dispatch) {
  return {
    get_subforums: () => {
      dispatch(get_subforums());
    },
    post_subforum: (title, description) => {
      dispatch(post_subforum(title, description));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
