import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import watchlist from '../../../app/reducers/watchlist';

describe('cryptex watchlist reducer', () => {
  it('should handle initial state', () => {
    expect(
      watchlist(undefined, {})
    ).to.eql([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle ADD_TODO', () => {
    expect(
      watchlist([], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: false,
      id: 0
    }]);

    expect(
      watchlist([{
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);

    expect(
      watchlist([{
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.ADD_TODO,
        text: 'Fix the tests'
      })
    ).to.eql([{
      text: 'Fix the tests',
      completed: false,
      id: 2
    }, {
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle DELETE_TODO', () => {
    expect(
      watchlist([{
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.DELETE_TODO,
        id: 1
      })
    ).to.eql([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle EDIT_TODO', () => {
    expect(
      watchlist([{
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.EDIT_TODO,
        text: 'Fix the tests',
        id: 1
      })
    ).to.eql([{
      text: 'Fix the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle COMPLETE_TODO', () => {
    expect(
      watchlist([{
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.COMPLETE_TODO,
        id: 1
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: true,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle COMPLETE_ALL', () => {
    expect(
      watchlist([{
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.COMPLETE_ALL
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: true,
      id: 1
    }, {
      text: 'Use Redux',
      completed: true,
      id: 0
    }]);

    // Unmark if all watchlist are currently completed
    expect(
      watchlist([{
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: true,
        id: 0
      }], {
        type: types.COMPLETE_ALL
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      watchlist([{
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.CLEAR_COMPLETED
      })
    ).to.eql([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    expect(
      [{
        type: types.COMPLETE_TODO,
        id: 0
      }, {
        type: types.CLEAR_COMPLETED
      }, {
        type: types.ADD_TODO,
        text: 'Write more tests'
      }].reduce(watchlist, [{
        id: 0,
        completed: false,
        text: 'Use Redux'
      }, {
        id: 1,
        completed: false,
        text: 'Write tests'
      }])
    ).to.eql([{
      text: 'Write more tests',
      completed: false,
      id: 2
    }, {
      text: 'Write tests',
      completed: false,
      id: 1
    }]);
  });
});
