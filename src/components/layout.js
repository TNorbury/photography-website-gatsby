import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { css } from '@emotion/core';
import { Helmet } from 'react-helmet';
import '../styles/global.css';
import { Link, StaticQuery, graphql } from 'gatsby';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
            <StaticQuery
                query={graphql`
                    query {
                        allSitePage(
                            filter: {
                                path: { nin: ["/", "/dev-404-page/", "/404/"] }
                            }
                        ) {
                            edges {
                                node {
                                    path
                                    context {
                                        parent
                                    }
                                }
                            }
                        }
                    }
                `}
                render={data => (
                    <div
                        css={css`
                            background-color: #efebe9;
                        `}
                    >
                        <Helmet>
                            <meta charSet="utf-8" />
                            <meta
                                name="Description"
                                content="Tyler Norbury's Photography Portfolio"
                            />
                            <title>Tyler Norbury Photography</title>
                        </Helmet>
                        <Navbar
                            expand="md"
                            css={css`
                                background-color: #bdb9b7;
                            `}
                        >
                            <Link to="/">
                                <NavbarBrand>
                                    Tyler Norbury Photography
                                </NavbarBrand>
                            </Link>
                            <NavbarToggler onClick={this.toggle} css={css`border-color: rgba(0,0,0,.25);`}/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Albums
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {data.allSitePage.edges.map(
                                                ({ node }) => (
                                                    <Link to={node.path}>
                                                        <DropdownItem>
                                                            {
                                                                node.context
                                                                    .parent
                                                            }
                                                        </DropdownItem>
                                                    </Link>
                                                )
                                            )}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <NavItem>
                                        <Link to="/about/">
                                            <NavLink>About Me</NavLink>
                                        </Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                        {this.props.children}
                    </div>
                )}
            />
        );
    }
}
