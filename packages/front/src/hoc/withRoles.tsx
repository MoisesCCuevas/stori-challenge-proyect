import React from 'react';
import { Profile } from '../main/Profile';

const withRoles = (Component: React.FC<Profile>) => {
  return function Roles(props: any) {
    const getData = async () => {
      const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${props.email}/roles`;
      const data = await fetch(url, {
        method: 'GET',
        headers: {authorization: 'Bearer MGMT_API_ACCESS_TOKEN'}
      });
      const response = await data.json();
      return response;
    }
    const roles = getData();

    return <Component {...props} roles={roles} />
  }
}

export { withRoles };