import React from 'react';
import Comment from './Comment';
import { createShallow, createMount } from '@material-ui/core/test-utils';

describe('<Article/>', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render without errors', () => {
    const component = shallow(<Comment.WrappedComponent />);
    let wrapper = component.find('.commentbox');
    expect(wrapper.length).toBe(1);
  });

  it('should have good edit-comment-button1', () => {
    const spyPrompt = jest.spyOn(window, 'prompt').mockImplementation(() => {
      return 'hi';
    });
    const mockClickDone = jest.fn();
    const component = shallow(
      <Comment.WrappedComponent
        onPut={mockClickDone}
        author_id="1"
        current_user_id="1"
      />
    );
    const wrapper = component.find('#edit-comment-button');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

  it('should have good edit-comment-button2', () => {
    const spyPrompt = jest.spyOn(window, 'prompt').mockImplementation(() => {
      return '';
    });
    const mockClickDone = jest.fn();
    const component = shallow(
      <Comment.WrappedComponent
        onPut={mockClickDone}
        author_id="1"
        current_user_id="1"
      />
    );
    const wrapper = component.find('#edit-comment-button');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(0);
  });

  it('should have good delete-comment-button', () => {
    const mockClickDone = jest.fn();
    const component = shallow(
      <Comment.WrappedComponent
        onDelete={mockClickDone}
        author_id="1"
        current_user_id="1"
      />
    );
    const wrapper = component.find('#delete-comment-button');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

  it('should not show delete or edit button when user is not the owner', () => {
    const component = shallow(
      <Comment.WrappedComponent author_id="1" current_user_id="2" />
    );
    let wrapper = component.find('#delete-comment-button');
    expect(wrapper.length).toBe(0);
    wrapper = component.find('#edit-comment-button');
    expect(wrapper.length).toBe(0);
  });
});
