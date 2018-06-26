// External Imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

class SimilarDisc extends Component {
  render() {
    const { pageTitle } = this.props;
    const content = (
      <DocumentTitle title={pageTitle}>
        <div>
          Similar Disc Functionality Coming Soon.
        </div>
      </DocumentTitle>
    );

    return content;
  }
}


SimilarDisc.propTypes = {
  dispatch: PropTypes.func,
  pageTitle: PropTypes.string,
};

SimilarDisc.defaultProps = {
  pageTitle: 'Similar Disc',
};

const mapStateToProps = state => ({
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(SimilarDisc);
