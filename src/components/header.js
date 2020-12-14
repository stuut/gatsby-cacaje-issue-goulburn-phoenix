import React from 'react'
import { Link } from 'gatsby'
import MenuLinks from './MenuLinks.js'
import headerStyles from './headerStyles.module.css'
import DarkMode from './DarkMode.js'

const Nav = (props) => {
  const opacity = (props.opacity) ? Math.max(props.opacity, 0.05) : 0;
  return (
    <div className={`${headerStyles.hiddenMenu} ${'darkModeBlack'}`} style={{ opacity }}>
     <MenuLinks/>
    </div>
  );
};

class Header extends React.Component {
  static defaultProps = {
    headerHeight: 275,
    fadeInDistance: 80
  };

  constructor(props) {
    super(props);
    this.state = {
      navOpacity: 0 ,
      menuOpen: false
    };
    this.updateNavOpacity = this.updateNavOpacity.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateNavOpacity);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateNavOpacity);
  }

  updateNavOpacity() {
    const navbarHeight = 50; // Bootstrap default
    const {headerHeight, fadeInDistance } = this.props;
    const endFade = headerHeight - navbarHeight;
    const startFade = endFade - fadeInDistance;
    const scrolly = window.scrollY;

    if (scrolly < startFade) {
      if (this.state.opacity === 0) return;
      this.setState({ navOpacity: 0 });
      return;
    }

    if (scrolly > endFade) {
      if (this.state.opacity === 1) return;
      this.setState({ navOpacity: 1 });
      return;
    }

    const pxPastStartFade = scrolly - startFade;
    const navOpacity = pxPastStartFade / (endFade - startFade);
    this.setState({ navOpacity });
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render() {
    return (
      <div className={'header darkModeMidBackground'}>
        <Nav opacity={ this.state.navOpacity }/>
        <div className={headerStyles.headerMenu}>
          <div>
            <div style={{maxWidth:'850px', position:'relative', margin: '0 auto'}}>
              <div className={headerStyles.businessLink}>
              </div>
              <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                <div className={'headerLogo'}>
                </div>
              </Link>
              <DarkMode />

            </div>
          <div className={headerStyles.mobileMenu}>
          </div>
               <MenuLinks />
          </div>

        </div>
      </div>
    );
  }
}

export default Header
