import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import Button from './Button'

class App extends Component {
  render() {
    return (
      <div class="app-container">
        <Button message={this.props.message} />
      </div>
    )
  }
}

export default connect('message')(({ message }) => <App message={message} />)
