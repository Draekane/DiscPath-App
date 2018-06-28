import PropTypes from 'prop-types';
import React from 'react';
import ReactTable from 'react-table';
// import { FaEyeSlash, FaEye } from 'react-icons/lib/fa';

import { discShape } from '../../propTypeShapes/bagShapes';

const DiscList = (props) => {
  const {
    discs,
    headerClassName,
    title,
  } = props.props;

  const createHeader = () => <div className={headerClassName}>&nbsp;&nbsp;{`${title} (total discs: ${discs.length})`}</div>;

  return (
    <ReactTable
      data={discs}
      minRows="0"
      showPagination
      columns={[
        {
          Header: createHeader(),
          headerClassName,
          columns: [
            // {
            //   accessor: 'enabled',
            //   Cell: (row) => {
            //     if (row.value === true) {
            //       return (
            //         <span title="Click to Hide this Disc" >
            //           <FaEye className="fa-eye-icon" />
            //         </span>);
            //     }
            //     return (
            //       <span title="Click to Show this Disc" >
            //         <FaEyeSlash className="fa-eye-slash-icon" />
            //       </span>);
            //   },
            //   width: 25,
            // },
            {
              id: 'discDisplayName',
              accessor: d => `${d.company} ${d.name}`,
              Cell: row => (row.value),
              className: 'leftAlignCell',
              width: 250,
            },
          ],
        },
      ]}
      className="-striped -highlight"
    />
  );
};

DiscList.propTypes = {
  props: PropTypes.shape({
    discs: PropTypes.arrayOf(discShape),
    headerClassName: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default DiscList;
