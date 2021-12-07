/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import {Stepper} from '@/components/Stepper.js'

describe('Stepper component', () => {
  render(<Stepper/>)
  const button = document.getElementsByTagName('button');
  it('should render button', () => {
    expect(button).toContainHTML;
  })
  it('should have correct text content on button', () => {

  })

  it('should update step-count and button content on click', async () => {})
  it('should remove button when step count is higher than amount of steps', async () => {})
})
