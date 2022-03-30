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
    const { getByTestId } = render(
      <Form
        student={'Jon Jones'}
        interviewers={interviewers}
      />)
    expect(getByTestId('student-name-input')).toHaveValue('Jon Jones')
  });

  it("validates that the student name is not blank", () => {

    const onSave = jest.fn();
    /* 1. Create the mock onSave function */

    const { getByText } = render(
      <Form
        onSave={onSave}
        student=''
        interviewers={interviewers}
      />)
    /* 2. Render the Form with interviewers and the onSave mock function passed as 
          an onSave prop, the student prop should be blank or undefined */

    fireEvent.click(getByText('Save'));
    /* 3. Click the save button */

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

});