import React from 'react';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';


class SearchBar extends React.Component {

    state = {
        errorMessage: ''
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.setValidationError = this.setValidationError.bind(this);
        this.renderValidationError = this.renderValidationError.bind(this);
    }

    onSubmit = (formValues) => {
        // console.log('---formValues', formValues);
        this.props.onSubmit(formValues)
    };

    renderSearch = ({input, meta}) => {
        // console.log('---meta', meta);
        const classNameStr = `ui action input ${(meta.error && meta.touched) ? 'error' : ''}`;
        const {pristine, reset, submitting } = this.props;

        return (
            <div className={classNameStr}>
                <input {...input} autoComplete={'off'} placeholder={'Search...'} />
                {this.setValidationError(meta)}
                <button className={'ui icon button'}  disabled={submitting}>
                    <i aria-hidden="true" className="search icon"></i>
                </button>
            </div>
        );
    };

    setValidationError({error, touched}) {
        if (touched && error) {
            this.setState({errorMessage: error})
        } else {
            this.setState({errorMessage: ''})
        }
    };

    renderValidationError() {
        const {errorMessage} = this.state;

        if(errorMessage === ''){
            return false;
        }

        return (
            <div className={'ui error mini message'}>
                <div className={'header'}>{this.state.errorMessage}</div>
            </div>
        );
    }

    render() {

        return (
            <form className={'ui form error'} onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className={'field'}>
                    <Field
                        name="searchText"
                        component={this.renderSearch}
                        type="text"
                    />
                </div>
                {this.renderValidationError()}
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.searchText) {
        errors.searchText = 'You must enter an artist to search for!';
    }

    return errors;
};

const formWrapped = reduxForm({
    form: 'artistSearch',
    validate
})(SearchBar);

export default connect(null, {SearchBar})(formWrapped);