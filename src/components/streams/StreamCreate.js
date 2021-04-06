import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    //touched - blur, click out of the form
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  //formProps properties from reduxForm (Field), we just need to hook them up to the input (include input and meta)
  //formProps or destr. {input}
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      //takes all key value pairs from input and adds them as properties (props) to the input element
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>

      // <input
      //   onChange={formProps.input.onChange}
      //   value={formProps.input.value}
      // />
    );
  };

  onSubmit = (formValues) => {
    // we don't need any event object here
    this.props.createStream(formValues);
  };
  render() {
    return (
      //different syntax with reduxForm
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        {/* Field is any type of input, here for title and description */}
        <Field name='title' component={this.renderInput} label='Enter Title' />
        <Field
          name='description'
          component={this.renderInput}
          label='Enter Description'
        />
        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  //title, description are name properties of each Field
  //if error.title is not empty, is passed to renderInput as meta(meta.error)
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

//reduxForm similar to redux connect
const formWrapped = reduxForm({
  //name of the form
  form: 'streamCreate',
  //passing the validation func
  validate: validate,
})(StreamCreate);

//connect
export default connect(null, { createStream })(formWrapped);
