import { Form, Link, NavLink } from "@remix-run/react";
import MainNavigation from "../mainNavBar/mainNavBar";

function Admin({ user }: { user: any }) {
    console.log(user)
    return (
        <nav id="main-navigation">
            <div className='logo'>
                <ul>
                    <li className="nav-item">
                        <Link to="/">Logo</Link>
                    </li>
                </ul>
            </div>
            <div className='nav'>
                <ul className="dropdown-custom">
                    <li className="nav-item">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/pricing">My Pricing</NavLink>
                    </li>
                    <li className="nav-item">
                        <div className="btn-group">

                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> {user?.first_name}
                                    <span className="caret"></span></button>
                                <ul className="dropdown-menu">
                                    <li><a href="#">HTML</a></li>
                                    <li><a href="#">CSS</a></li>
                                    <li><a href="#">JavaScript</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Form method="post" action="/logout" id="logout-form">
                            <button className="cta-alt">Logout</button>
                        </Form>
                    </li>
                </ul>

            </div>

        </nav>
    );
}

export default Admin;