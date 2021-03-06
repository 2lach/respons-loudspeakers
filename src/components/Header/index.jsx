import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import onClickOutside from 'react-onclickoutside';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as LinkForScroll } from 'react-scroll';
import humbergerSvg from '../../icons/humberger.svg';
import logoSvg from '../../icons/logo-white.svg';

const propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
      isScrolled: false,
    };

    this.closeMenu = this.closeMenu.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.onHumbergerClick = this.onHumbergerClick.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('keydown', this.onKeydown);
  }

  // open menu
  onHumbergerClick() {
    const { isMenuOpen } = this.state;
    this.setState({
      isMenuOpen: !isMenuOpen,
    });
  }

  // ESC press leave menu
  onKeydown(e) {
    if (e.keyCode === 27) {
      this.setState({
        isMenuOpen: false,
      });
    }
  }

  // nav background changer
  onScroll() {
    const JUDGE_POSITION_Y = 50;

    const supportPageOffset = window.pageYOffset !== undefined;
    const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';

    let scrollY;
    if (supportPageOffset) scrollY = window.pageYOffset;
    else if (isCSS1Compat) scrollY = document.documentElement.scrollTop;
    else scrollY = document.body.scrollTop;

    if (scrollY > JUDGE_POSITION_Y) {
      this.setState({
        isScrolled: true,
      });
    } else {
      this.setState({
        isScrolled: false,
      });
    }
  }

  closeMenu() {
    this.setState({
      isMenuOpen: false,
    });
  }

  handleClickOutside() {
    const { isMenuOpen } = this.state;
    if (isMenuOpen) {
      this.setState({
        isMenuOpen: false,
      });
    }
  }

  render() {
    const settings = {
      transitionSpeed: '0.25s',
      barColor: 'rgba(0, 0, 15, 0.8)',
      opacityHide: 0.2,
    };
    const { location } = this.props;
    const { isMenuOpen, isScrolled } = this.state;
    const isRootPath = location.pathname === '/';
    const shouldBeHide = isRootPath && !isMenuOpen && !isScrolled;

    const styles = {
      navbar: {
        background: shouldBeHide ? 'rgba(56,59,64,0.54)' : settings.barColor,
        display: 'flex',
        height: '50px',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        transition: `background ${settings.transitionSpeed} ease-out`,
        width: '100%',
        zIndex: 300,
        boxShadow: shouldBeHide
          ? 'none'
          : '0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)',
      },
      menu: {
        display: 'flex',
        '@media (max-width:749px)': {
          flexDirection: 'column',
          left: 0,
          maxHeight: isMenuOpen ? '500px' : '0px',
          overflow: 'hidden',
          position: 'fixed',
          top: '50px',
          transition: `max-height ${settings.transitionSpeed} ease-out`,
          width: '100%',
        },
        '@media (min-width:750px)': {
          flexDirection: 'row',
          marginRight: '1rem',
          width: '500px',
        },
      },
      menuItems: {
        color: '#fff',
        cursor: 'pointer',
        opacity: shouldBeHide ? settings.opacityHide : 1,
        textDecoration: 'none',
        transition: `background ${settings.transitionSpeed} ease-out, opacity ${
          settings.transitionSpeed
        } ease-out`,
        '.active': {
          background: 'rgba(100, 100, 110, 0.95)',
        },
        '@media (max-width:749px)': {
          background: settings.barColor,
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'block',
          padding: '12px 25px',
          width: '100%',
        },

        '@media (min-width:750px)': {
          alignItems: 'center',
          flex: '1 0 auto',
          display: 'flex',
          justifyContent: 'center',
        },
      },
      logo: {
        cursor: 'pointer',
        display: 'flex',
        marginLeft: '25px',
        opacity: shouldBeHide ? settings.opacityHide : 1,
        width: '180px',
        transition: `opacity ${settings.transitionSpeed} ease-out`,
        ' img': {
          // for IE11
          width: '180px',
          height: '50px',
        },
      },
      humbergerIcon: {
        display: 'flex',
        alignItems: 'center',
        width: '28px',
        marginRight: '1.5rem',
        opacity: shouldBeHide ? settings.opacityHide : 1,
        outline: 0,
        transition: `opacity ${settings.transitionSpeed} ease-out`,
        '@media (min-width:750px)': {
          display: 'none',
        },
      },
    };
    // const icon = <FontAwesomeIcon icon="music" />;
    const menuItem = [
      {
        name: 'Home',
        id: 'top',
        path: '/#top',
      },
      { name: 'About', id: 'summary', path: '/#summary' },
      /* { name: 'Tests', id: 'skill', path: '/#skill' }, */
      { name: 'Speakers', id: 'performance', path: '/#performance' },
      { name: 'FAQ', id: 'profile', path: '/#profile' },
      { name: 'Contact', id: 'contact', path: '/#contact' },
      { name: 'News', id: 'news', path: '/news/' },
      /* { name: 'Respons Speakers', id: 'speakers', path: '/news/' }, */
    ];

    return (
      <nav css={styles.navbar}>
        {isRootPath ? (
          <LinkForScroll to="top" smooth duration={150} css={styles.logo}>
            <img src={logoSvg} alt="logo" />
          </LinkForScroll>
        ) : (
          <Link to="/" css={styles.logo}>
            <img src={logoSvg} alt="logo" />
          </Link>
        )}

        <ul css={styles.menu}>
          {menuItem.map(item => {
            if (isRootPath && item.path.substr(0, 2) === '/#') {
              return (
                <LinkForScroll
                  to={item.id}
                  spy // active
                  smooth
                  duration={150}
                  offset={-50}
                  key={item.id}
                  activeClass="active"
                  css={styles.menuItems}
                  onClick={this.closeMenu}
                >
                  {item.name}
                </LinkForScroll>
              );
            }

            return (
              <Link
                to={item.path}
                key={item.id}
                css={styles.menuItems}
                className={
                  location.pathname.substr(0, item.path.length) === item.path
                    ? 'active'
                    : null
                }
                onClick={this.closeMenu}
              >
                {item.name}
              </Link>
            );
          })}
        </ul>

        <div
          css={styles.humbergerIcon}
          onClick={this.onHumbergerClick}
          onKeyDown={e => {
            if (e.keyCode === 13) this.onHumbergerClick();
          }}
          role="button"
          tabIndex={0}
        >
          <img src={humbergerSvg} alt="menu button" />
        </div>
      </nav>
    );
  }
}

Header.propTypes = propTypes;

export default onClickOutside(Header);
