import React, {Component} from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        });
    };

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form className={"item-add-form d-flex"}
                  onSubmit={ this.onSubmitForm } >
                <input type={"text"}
                       className={"form-control"}
                       placeholder={"new task"}
                       onChange={ this.onLabelChange }
                       value={ this.state.label } />
                <button className={"btn btn-outline-secondary btn-app-item"}>
                    Add Item
                </button>
            </form>
        );
    }
}