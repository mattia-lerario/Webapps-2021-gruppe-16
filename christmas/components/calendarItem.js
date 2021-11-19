import React from 'react'

class CalendarItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: this.props.day,
      dayOfWeek: this.props.dayOfWeek,
      isSelected: this.props.isSelected,
      isToday: this.props.isToday,
      isHovered: false,
      isActive: this.props.isActive,
      isDisabled: this.props.isDisabled,
      isSelectedMonth: this.props.isSelectedMonth,
      isSelectedYear: this.props.isSelectedYear,
    }
  }

  //handle the hover event
  handleHover() {
    this.setState({
      isHovered: !this.state.isHovered,
    })
  }

  //handle the click event
  handleClick() {
    this.setState({
      isSelected: !this.state.isSelected,
    })
  }

  //handle the click event
  handleActive() {
    this.setState({
      isActive: !this.state.isActive,
    })
  }

  render() {
    return (
      <div
        className={`calendar-item ${
          this.state.isCurrentMonth ? 'current-month' : ''
        } ${this.state.isSelected ? 'selected' : ''} ${
          this.state.isToday ? 'today' : ''
        } ${this.state.isHovered ? 'hovered' : ''} ${
          this.state.isDisabled ? 'disabled' : ''
        } ${this.state.isActive ? 'active' : ''} ${
          this.state.isSelectedMonth ? 'selected-month' : ''
        }
        )`}
        onClick={() => this.handleClick()}
        onMouseEnter={() => this.handleHover()}
        onMouseLeave={() => this.handleHover()}
      >
        {this.state.dayOfMonth}
      </div>
    )
  }
}
