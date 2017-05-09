import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './CommentBox';

const URL = 'http://localhost:3001/api/comments';

ReactDOM.render(
  <CommentBox
    url={URL}
    pollInterval={2000}
  />,
  document.getElementById('root')
);
