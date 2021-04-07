import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    //we need to fetch the data autonomously, in case user goes directly to this page, without hitting the main page
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    //id, changed formValues (only changed ones, no id, no userId)
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* initialValues = special Redux form prop, title and description are Field names in StreamForm */}
        <StreamForm
          onSubmit={this.onSubmit}
          //we passing an object here could be {title: 'this.props.stream.title', description:'this.props.description'} too
          //picking ONLY EDITED values with lodash
          initialValues={_.pick(this.props.stream, 'title', 'description')}
        />
      </div>
    );
  }
}

//ownProps are props from the StreamEdit component itself
//props === ownProps coming from Router => we have access to match, history, .., we take id from the URL
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
