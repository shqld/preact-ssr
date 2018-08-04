import { h } from 'preact'

export default ({ message }) => <p onClick={() => alert(message)}>{message}</p>
