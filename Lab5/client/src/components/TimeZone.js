import React, { Component } from 'react';
import './styles/userZone.css';
import Moment from 'moment';

class TimeZoneInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localTime: '',
      utcTime: '',
      userTimeZone: '',
      data: ''
    };
  }

  componentDidMount() {
    this.getUserTimeZoneInfo();
    this.intervalId = setInterval(this.updateTimes, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getUserTimeZoneInfo = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.setState({ userTimeZone: timeZone });
    this.setState({ data: new Date().toLocaleString()  });
  };

  updateTimes = () => {
    const now = new Date();

    const localTimeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
    const localTimeString = now.toLocaleString(undefined, localTimeOptions);
    this.setState({ localTime: localTimeString });

    const utcTimeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    };
    const utcTimeString = now.toLocaleString(undefined, utcTimeOptions);
    this.setState({ utcTime: utcTimeString });
  };

  render() {

    return (
      <div className="time-info">
      <p>User timezone: <span>{this.state.userTimeZone}</span></p>
      <p>Local time: <span>{this.state.localTime}</span></p>
      <p>UTC time: <span>{this.state.utcTime}</span></p>
      <p>Local date: <span>{Moment(this.state.data).format('MMM Do YYYY')}</span></p>
    </div>
    );
  }
}

export default TimeZoneInfo;