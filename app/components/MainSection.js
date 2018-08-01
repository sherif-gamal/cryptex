import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {

  static propTypes = {
    watchlist: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted = () => {
    const atLeastOneCompleted = this.props.watchlist.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { watchlist, actions } = this.props;
    if (watchlist.length > 0) {
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={completedCount === watchlist.length}
          onChange={actions.completeAll}
        />
      );
    }
  }

  renderFooter(completedCount) {
    const { watchlist } = this.props;
    const { filter } = this.state;
    const activeCount = watchlist.length - completedCount;

    if (watchlist.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
  }

  render() {
    const { watchlist, actions } = this.props;
    const { filter } = this.state;

    const filteredwatchlist = watchlist.filter(TODO_FILTERS[filter]);
    const completedCount = watchlist.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0
    );

    return (
      <section className={style.main}>
        {this.renderToggleAll(completedCount)}
        <ul className={style.todoList}>
          {filteredwatchlist.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}
