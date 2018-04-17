import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import _ from 'lodash';

import FlightMap from '../../components/map/flightMap';
import CompanyDiscs from '../../components/company/companyDiscs';
import { companyShape } from '../../propTypeShapes/companyShapes';
import * as CompanyActions from '../../actions/company';

const discs = [{
  discId: -1,
  company: 'Dynamic Discs',
  name: 'Breakout',
  range: 358,
  hst: -23,
  lsf: 38,
  type: 'F',
  enabled: true,
  wear: 10,
}, {
  discId: -1,
  company: 'Dynamic Discs',
  name: 'Deputy',
  range: 261,
  hst: -27,
  lsf: 0,
  type: 'P',
  enabled: true,
  wear: 10,
}];

const thrower = {
  throwType: 'rhbh',
  power: 32,
  fanPower: true,
  pathsShown: 'one',
  lieDistance: true,
  lieCircle: true,
  isRequired: {},
};

class SinglePane extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(CompanyActions.loadCompanies());
  }
  componentDidUpdate(props) {
    const { companies } = props;

    _.forEach(companies, company => console.log(company));
  }
  component

  render() {
    const { pageTitle, pageHeader, companies } = this.props;
    const content = (
      <DocumentTitle title={pageTitle}>
        <div className="workspace-container grid-container" >
          <header className="App-header grid-item-header">
            <h1 className="App-title">{pageHeader}</h1>
          </header>
          <div className="grid-item2">
            <FlightMap discs={discs} thrower={thrower} />
          </div>
          <div className="grid-item2">
            <CompanyDiscs companies={companies} />
          </div>
          <div className="grid-item1">Throw Selector Goes Here</div>
          <div className="grid-item1">Display Options Goes Here</div>
          <div className="grid-item1">Import/Export Options Go Here</div>
        </div>
      </DocumentTitle>
    );

    return content;
  }
}

SinglePane.propTypes = {
  pageTitle: PropTypes.string,
  pageHeader: PropTypes.string,
  companies: PropTypes.arrayOf(companyShape),
  dispatch: PropTypes.func,
};

SinglePane.defaultProps = {
  pageTitle: 'DiscPath',
  pageHeader: 'Experimental Disc Golf Flight Path Visualizer',
};

const mapStateToProps = state => ({
  companies: state.companies,
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(SinglePane);
