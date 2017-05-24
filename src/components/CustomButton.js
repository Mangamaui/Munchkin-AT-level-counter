let React =  require('react');

class CustomButton extends React.Component {
  render() {
    return (
      <button className={"button " + this.props.button_class } type="button" onClick={this.props.button_handler} disabled={this.props.disabled}>
        {this.props.background ? this.rectangle() : this.square()}
        {this.props.children}
        <span className="button__text">{this.props.button_text}</span>
      </button>
      );
  }

  rectangle() {
    return (<svg viewBox="0 0 292 40" preserveAspectRatio="none">
      <g fill="none">
        <path className="button_base-color" d="M0.3 0L291.7 0 291.7 40C287.5 40 284.2 40 281.7 40 279.2 40 276.7 40 274.2 40L0.3 40 0.3 0Z" />
        <path className="button_shadow" d="M291.7 25.3L291.7 40C287.5 40 284.2 40 281.7 40 279.2 40 276.7 40 274.2 40L0.3 40 0.3 25.5C43.8 31 93 34 145 34 197.8 34 247.7 30.9 291.7 25.3Z"/>
        <path className="button_gloss" d="M291.7 8.2L291.7 0 0.3 0 0.3 8.1C44.4 5.5 93.6 4 145.5 4 197.8 4 247.3 5.5 291.7 8.2Z" />
      </g>
    </svg>);
  }

  square() {
    return (
      <svg viewBox="0 0 48 48">
        <g fill="none">
          <rect className="button_base-color" width="48" height="48" fill="#FFD42B"/>
          <path className="button_shadow" fill="#E39A00" d="M48,40.1117177 L48,48 L0,48 L0,40.1117177 C6.98695884,42.5781526 15.2052502,44 24,44 C32.7947498,44 41.0130412,42.5781526 48.0000202,40.1117106 Z"/>
          <path className="button_gloss" fill="#FFF4CB" d="M48,5.41362895 L48,0 L0,0 L0,5.41362895 C7.33210464,3.86232342 15.4538563,3 24,3 C32.5461437,3 40.6678954,3.86232342 48,5.41362895 Z"/>
        </g>
      </svg>);
  }
}

CustomButton.defaultProps = {
  background: "default"
};

module.exports = CustomButton;
