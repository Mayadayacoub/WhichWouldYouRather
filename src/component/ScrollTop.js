import React, { Component } from "react";

class ScrollTop extends Component {
  state = {
    intervalId: 0,
    Position: false,
  };

  componentDidMount() {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 110) {
        this.setState({ Position: true });
      } else {
        this.setState({ Position: false });
      }
    });
    window.scrollTo(0, 0);
  }

  onScrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.ScrollSteps);
  };

  scrollToTop = () => {
    let intervalId = setInterval(this.onScrollStep, this.props.transInMin);
    this.setState({ intervalId: intervalId });
  };

  renderGoTopIcon = () => {
    if (this.state.Position) {
      return (
        <>
          <div className="move-up">
            <span>
              <i
                className="fas fa-arrow-alt-circle-up fa-2x"
                onClick={this.scrollToTop}
              />
            </span>
          </div>
        </>
      );
    }
  };

  render() {
    return <>{this.renderGoTopIcon()}</>;
  }
}

export default ScrollTop;
