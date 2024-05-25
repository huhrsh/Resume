import { Link, Outlet, useNavigate } from "react-router-dom";
import profile from "../Assets/Images/abstract.png"
import Loading from "../Pages/Loading";
import { useUser } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

export default function Header() {
    const navigate=useNavigate()
    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            toast.success('Signed out successfully!');
            navigate('/')
        } catch (error) {
            toast.error('Error signing out');
            console.error('Error during sign out:', error);
        }
    };

    const { user, loading } = useUser();
    return (
        <>
            <ToastContainer autoClose={3000} position="top-center" />
            {loading && <Loading />}
            <header className="shadow sticky top-0 left-0 bg-white z-50 shadow-purple-100 font-[raleway] px-12 py-4 flex justify-between items-center antialiased">
                <Link to='/' className="text-3xl bg-gradient-to-bl from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-1 font-medium">
                    <img src={profile} alt="logo" className="h-8 logo" />
                    ResuMe
                </Link>
                {!loading &&
                <div className="flex justify-between min-w-56 text-lg font-medium gap-6">
                    {user ?
                        user.resume ?
                            <Link className="flex-shrink-0 rounded text-purple-800 px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/user-info/basics'>
                                Modify website
                            </Link> :
                            <Link className="flex-shrink-0 rounded text-purple-800 px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/user-info/basics'>
                                Create website
                            </Link>
                        :
                        <Link className="rounded text-purple-800 px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/sign-up'>
                            Sign up
                        </Link>
                    }
                    {
                        user ?
                            <button className="rounded text-rose-700 px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-rose-700" onClick={(e) => { handleSignOut(e) }}>
                                Sign out
                            </button> :
                            <Link className="rounded text-purple-800 px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/sign-in'>
                                Sign in
                            </Link>
                    }
                </div>
                }
            </header>
            <Outlet />
        </>
    )
}