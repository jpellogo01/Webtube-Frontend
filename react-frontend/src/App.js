import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AddUserComponent from './components/AddUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import AddNewsForm from './components/AddNewsForm';
import ListNewsComponent from "./components/ListNewsComponent";
import ViewNewsDetailsForm from './components/ViewNewsDetailsForm';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AnimoSpotlight from './components/AnimoSpotlight';
import Istorya from './components/IstoryaComponent';
import Aranetalk from './components/AranetalkComponent';
import SilidAralneta from './components/SilidAralnetaComponent';
import AnimoVodCast from './components/AnimoVodCastComponent';
import Unauthorized from './components/Unauthorized';
import ListToReview from './components/ListToReview';
import NotificationComponent from './components/NotificationComponent';
import ListUserComponent from './components/ListUserComponent';
import ManagePendingNewsComponent from './components/ManagePendingNewsComponent';
import MyNewsListComponent from './components/MyNewsListComponent'
import ListCommentComponent from './components/ListCommentComponent '
import axios from 'axios';
import Balitaraneta from './components/Balitaraneta';
import ReadOnlyNewsDetails from './components/ReadOnlyNewsDetails copy';
// import sendRawContentComponent from './components/sendRawContentComponent'
import ContributeContentForm from './components/ContributeContentForm'
import ReadContributedNewsDetailsForm from './components/ReadContributedNewsDetailsForm';
import ListContributedNewsComponent from './components/ListContributedNewsComponent';

function App() {
    const [authenticated, setAuthenticated] = useState(null);
    const [role, setRole] = useState('');

    // Load token and role from localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        console.log("Token from localStorage:", token); // Debugging
        console.log("Role from localStorage:", userRole); // Debugging

        if (token && userRole) {
            setAuthenticated(true);
            setRole(userRole.trim().toUpperCase()); // Normalize role
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            setAuthenticated(false);
        }
    }, []);

    // Handle login
    function handleLogin(token, userRole) {
        console.log("Logging in with role:", userRole); // Debugging
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        setAuthenticated(true);
        setRole(userRole.trim().toUpperCase()); // Normalize role
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Loading screen
    if (authenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* Public Endpoints */}
                    <Route path="/" exact component={HomePage} />
                    <Route path="/comments" exact component={ListCommentComponent} />
                    <Route path="/balitaraneta" exact component={Balitaraneta} />
                    <Route path="/admin-approval" exact component={ListToReview} />
                    <Route path="/animo-spotlight" component={AnimoSpotlight} />
                    <Route path="/istorya" component={Istorya} />
                    <Route path="/aranetalk" component={Aranetalk} />
                    <Route path="/silid-aralneta" component={SilidAralneta} />
                    <Route path="/animo-vodcast" component={AnimoVodCast} />
                    <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
                    <Route path="/view-news/:id" component={ViewNewsDetailsForm} />
                    <Route path="/read-news/:id" component={ReadOnlyNewsDetails} />
                    <Route path="/ContributeContent" component={ContributeContentForm} />
                    <Route path="/ReadContributeContent/:id" component={ReadContributedNewsDetailsForm} />
                    <Route path="/ListContributeContent" component={ListContributedNewsComponent} />



                    {/* Protected Routes */}
                    {authenticated ? (
                        <>
                            {/* Shared Routes for Both ADMIN and AUTHOR */}
                            {(role === 'AUTHOR' || role === 'ADMIN') && (
                                <>
                                    <Route path="/my-news" component={MyNewsListComponent} />
                                    <Route path="/news" component={ListNewsComponent} />
                                    <Route path="/news-management" component={ListNewsComponent} />
                                    <Route path="/notification" component={NotificationComponent} />
                                    <Route path="/add-news/:id" component={AddNewsForm} />
                                    <Route path="/pending-news" component={ManagePendingNewsComponent} />
                                </>
                            )}

                            {/* Admin-Only Routes */}
                            {role === 'ADMIN' && (
                                <>
                                    <Route path="/add-user/:id" component={AddUserComponent} />
                                    <Route path="/view-user/:id" component={ViewUserComponent} />
                                    <Route path="/user-management" component={ListUserComponent} />
                                    <Route path="/comments-management" exact component={ListCommentComponent} />
                                </>
                            )}
                        </>
                    ) : role ? (
                        <Redirect to="/unauthorized" />
                    ) : (
                        <Redirect to="/login" />
                    )}

                    {/* Unauthorized Route */}
                    <Route path="/unauthorized" component={Unauthorized} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
