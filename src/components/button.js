let React =  require('react');

class CustomButton extends React.Component {
  render() {
    return (
      <button className={"button " + this.props.button_class }  onClick={this.props.button_handler} disabled={this.props.disabled}>
        <svg viewBox="0 0 292 40">
          <g fill="none">
            <path className="button_base-color" d="M0.3 0L291.7 0 291.7 40C287.5 40 284.2 40 281.7 40 279.2 40 276.7 40 274.2 40L0.3 40 0.3 0Z" />
            <path className="button_shadow" d="M291.7 25.3L291.7 40C287.5 40 284.2 40 281.7 40 279.2 40 276.7 40 274.2 40L0.3 40 0.3 25.5C43.8 31 93 34 145 34 197.8 34 247.7 30.9 291.7 25.3Z"/>
            <path className="button_gloss" d="M291.7 8.2L291.7 0 0.3 0 0.3 8.1C44.4 5.5 93.6 4 145.5 4 197.8 4 247.3 5.5 291.7 8.2Z" />
          </g>
        </svg>
        <span className="button__text">{this.props.button_text}</span>
      </button>
      );
  }
}

module.exports = CustomButton;
