import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { activeNavCSS, linkCSS, navLinkCSS } from '../../helpers/CSSHelpers';

function FollowPage({ profileUser }) {
  return (
    <div className="px-2 lg:px-0">
      <div className="flex justify-between py-3">
        <Link className={linkCSS} to={`/profile/${profileUser.profileUsername}`}>
          &lt;
        </Link>{' '}
        {profileUser.profileFirstName} {profileUser.profileLastName}{' '}
        <Link className={linkCSS} to="/">
          Home
        </Link>
      </div>
      <div className="flex justify-between pb-2">
        <NavLink
          className={linkCSS + navLinkCSS}
          activeStyle={activeNavCSS}
          to={`/profile/${profileUser.profileUsername}/followers`}
        >
          Followers
        </NavLink>

        <NavLink
          className={linkCSS + navLinkCSS}
          activeStyle={activeNavCSS}
          to={`/profile/${profileUser.profileUsername}/following`}
        >
          Following
        </NavLink>
      </div>
    </div>
  );
}

FollowPage.propTypes = {
  profileUser: PropTypes.object,
};

export default FollowPage;
