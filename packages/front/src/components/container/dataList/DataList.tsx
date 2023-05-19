import React from 'react';

interface DataList {
  loading: boolean
  data?: Array<any>
  isEmpty: boolean
  onLoading: () => void
  onEmpty: () => void
  render: () => void
}

const DataList = (props: any) => {
  const  {
    loading,
    data,
    isEmpty,
    onLoading,
    onEmpty,
    render
  } = props;
  return (
    <React.Fragment>
      {loading && onLoading()}
      {isEmpty && onEmpty()}
      {!isEmpty && data.map(render)}
    </React.Fragment>
  ); 
};

export default DataList;
