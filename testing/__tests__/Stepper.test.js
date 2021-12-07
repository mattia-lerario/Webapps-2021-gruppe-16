/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import {Stepper} from '@/components/Stepper.js'

describe('Stepper component', () => {
  render(<Stepper/>)
  const button = document.getElementById('button');


  it('should render button', () => {
    expect(button).toContainHTML;
    console.log(button);
  })
  it('should have correct text content on button', () => {
    expect(button).toHaveTextContent('Game');
  })

  it('should update step-count and button content on click', async () => {
    render(<Stepper/>)
    const clickedButton = document.getElementById('button');
    clickedButton.click();

    expect(clickedButton).toHaveTextContent('End');
  })
  it('should remove button when step count is higher than amount of steps', async () => {})
})