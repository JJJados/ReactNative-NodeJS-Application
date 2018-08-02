import React from 'react';
import { SignedOut, SignedIn } from './src/navigation/router'

export default class App extends React.Component {
  render() {
    return <SignedOut />;
  }
}
