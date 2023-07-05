import React, { Component } from 'react';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import AppFooter from "../app-footer";
import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all' // can take values: all, active, done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    deleteListItem = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((elem) => elem.id === id);
            const resultArray = [ ...todoData.slice(0, index), ...todoData.slice(index + 1) ];
            return { todoData: resultArray };
        });
    };

    addListItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
            return { todoData: [...todoData, newItem] };
        });
    };

    toggleProperty = (arr, id, propName) => {
        const index = arr.findIndex((elem) => elem.id === id);
        const oldItem = arr[index];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return [ ...arr.slice(0, index), newItem, ...arr.slice(index + 1) ];
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return { todoData: this.toggleProperty(todoData, id, 'important') };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return { todoData: this.toggleProperty(todoData, id, 'done') };
        });
    };

    search = (items, term) => {
        if (term.length === 0) return items;
        return items.filter(item => item.label.toLowerCase().includes(term.toLowerCase()));
    };

    onSearchChange = (term) => {
        this.setState({ term });
    }

    filter = (items, filter) => {
        switch (filter) {
            case 'all':    return items;
            case 'active': return items.filter((item) => !item.done);
            case 'done':   return items.filter((item) => item.done);
            default:       return items;
        };
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };


    render() {
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((elem) => elem.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={ this.onSearchChange } />
                    <ItemStatusFilter filter={ filter }
                                      onFilterChange={ this.onFilterChange } />
                </div>
                <TodoList todos={ visibleItems }
                          onDeleted={ this.deleteListItem }
                          onToggleImportant={ this.onToggleImportant }
                          onToggleDone={ this.onToggleDone } />
                <ItemAddForm onItemAdded={ this.addListItem } />
                <AppFooter />
            </div>
        );
    }
}
