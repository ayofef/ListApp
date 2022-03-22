import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { func, shape, string } from 'prop-types';
import { ADD_SLACK_TOKEN } from '../../utils/queries/public/publicMutations';
import { UI_ROUTES } from '../../constants/routes';

const InstallSlack = ({
  history: {
    location: { search },
    push,
  },
}) => {
  const [addSlackToken] = useMutation(ADD_SLACK_TOKEN);

  useEffect(() => {
    const params = queryString.parse(search);

    if (!params.code) {
      push('/');
    }
    addSlackToken({
      variables: {
        token: params.code,
      },
    }).then((res, err) => {
      if (res.errors && err) {
        push(UI_ROUTES.root);
      } else if (isEmpty(res.errors) && isEmpty(err) && params.state) {
        if (params.state !== UI_ROUTES.addToSlack) {
          push(`${UI_ROUTES.root}/${params.state}?success=${params.success || 'true'}`);
        } else {
          push(UI_ROUTES.root);
        }
      } else {
        push(`${UI_ROUTES.root}/apps${UI_ROUTES.spendRequest}`);
      }
    });
  }, [search, push, addSlackToken]);

  return null;
};

InstallSlack.propTypes = {
  history: shape({
    push: func.isRequired,
    location: shape({ search: string }).isRequired,
  }).isRequired,
};

export default withRouter(InstallSlack);
