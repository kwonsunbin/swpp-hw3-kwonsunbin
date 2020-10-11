import React from 'react';
import Initial from './Initial';
import { createShallow } from '@material-ui/core/test-utils';

describe('<Initial/>', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render without error', () => {
    const component = shallow(<Initial />);
    const wrapper = component.find('.toLogin');
    expect(wrapper.length).toBe(1);
  });
});
