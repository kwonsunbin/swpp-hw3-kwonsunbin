import React from 'react';
import Article from './Article';
import { createShallow } from '@material-ui/core/test-utils';

describe('<Article/>', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render without errors', () => {
    const component = shallow(
      <Article.WrappedComponent
        article={{ id: 1, title: 'Test Title', authorName: 'Test Author' }}
      />
    );
    let wrapper = component.find('.articleId');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('.articleButton');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('.articleAuthor');
    expect(wrapper.length).toBe(1);
  });

  it('should have good article button', () => {
    const mockClickDone = jest.fn();
    const historyMock = { push: mockClickDone };
    const component = shallow(
      <Article.WrappedComponent
        article={{ id: 1, title: 'Test Title', authorName: 'Test Author' }}
        history={historyMock}
      />
    );
    const wrapper = component.find('.articleButton');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
