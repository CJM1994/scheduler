import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../Appointment/Form';

describe('Form', () => {

  const interviewers = [
    {
      id: 1,
      student: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png'
    }
  ];

  it('Renders the form without crashing', () => {
    render(<Form interviewers={interviewers} />)
  });

  it('Renders without student name if not provided', () => {

    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />)
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('Renders with initial student name', () => {
    const { getByTestId } = render(<Form student={'Jon Jones'} interviewers={interviewers} />)
    expect(getByTestId('student-name-input')).toHaveValue('Jon Jones')
  });

  xit("validates that the student name is not blank", () => {

    const onSave = jest.fn();
    /* 1. Create the mock onSave function */

    const { getByText } = render(<Form onSave={onSave} student='' interviewers={interviewers} />)
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */

    fireEvent.click(getByText('Save'));
    /* 3. Click the save button */

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {

    const onSave = jest.fn();
    /* 1. Create the mock onSave function */

    const { queryByText, getByText } = render(<Form onSave={onSave} student='Lydia Miller-Jones' interviewer={null} interviewers={interviewers} />)
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */

    fireEvent.click(getByText('Save'));
    /* 3. Click the save button */

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

});