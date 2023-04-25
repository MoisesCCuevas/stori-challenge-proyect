import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Modal from '../../../components/core/modal';

const setActiveModal = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
const useStateMock : any = (ActiveModal: any) => [ActiveModal, setActiveModal];
useStateSpy.mockImplementation(useStateMock);

describe('Modal', () => {
  beforeAll(() => {
    const props = { activeModal: '' };
    render(<Modal {...props} />);
  });

  afterEach(cleanup);

  test('Renders component', async () => {
    const newProps = {
      activeModal: 'modalEPG'
    };
    const component = render(<Modal {...newProps} />);
    expect(setActiveModal).toBeCalledTimes(4);
    expect(component).not.toBeNull();
  });
});

