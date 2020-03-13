import React, { useState, useEffect } from "react";
import { Container, Col, Breadcrumb } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { IoIosChatboxes, IoMdPersonAdd } from 'react-icons/io';
import { FaRegNewspaper, FaBug } from 'react-icons/fa';
import { NavigationBar } from "../../components/base/NavigationBar";
import SubforumOverview from '../../components/specialized/Forum/SubforumOverview';

import { get_subforums } from "../../actions/forumActions";

const Root = withRouter(({get_subforums, subforums}) => {
    const [subforumsList, setSubforumsList] = useState([]);

    useEffect(() => {
      get_subforums();
    });

    useEffect(() => {
      setSubforumsList(subforums);
    }, [subforums])

    return (
      <div>
      <NavigationBar />
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex flex-column">
          {subforumsList.map((subforum) => 
          <SubforumOverview key={subforum.id} path={subforum.path} title={subforum.title} description={subforum.description} icon={subforum.icon}/>)}
        </div>
        </Container>    
      </div>
    );
});

function mapStateToProps(state) {
  return {subforums: state.forum.subforums}
}

function mapDispatchToProps(dispatch) {
  return {
    get_subforums: () => {
      dispatch(get_subforums())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Root);
