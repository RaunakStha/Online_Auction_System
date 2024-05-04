import {createContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const swal = require('sweetalert2')

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );


    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        
        const data = await response.json();
    
        if(response.status === 200){
            // Check if the user is an admin
            const isAdmin = data.user_group === "Admin"; // Assuming your API response provides user group information
            const isSuperuser = data.is_superuser; // Assuming your API response provides superuser status
    
            if(isAdmin || isSuperuser) {
                // Show error message and do not login
                swal.fire({
                    title: "Admin or Superuser Login Restricted",
                    text: "Admins and superusers are not allowed to log in through this interface.",
                    icon: "error",
                    toast: true,
                    timer: 4000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
                console.log("Logged In");
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                navigate("/Home");
                swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    toast: true,
                    timer: 4000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } else {    
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "Username or password does not exist",
                icon: "error",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };
    


    const registerUser = async (email, username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        if(response.status === 201){
            navigate("/login")
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

 
    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        console.log("Logged Out");
        navigate("/login")
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const makeBid = async (product_id, bidAmount) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/bids/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authTokens.access}`
                },
                body: JSON.stringify({ product: product_id, bid: bidAmount })
            });
            if (response.status === 201) {
                swal.fire({
                  title: "Bid Successfully Placed",
                  width: 600,
                  text: "Your bid has been successfully placed.",
                  icon: "success",
                  toast: true,
                  position: 'center',
                  timerProgressBar: false,
                  showConfirmButton: true,
                }).then(() => {
                    navigate("/dashboard")
                  window.location.reload(); // Reload the page
                });
            } else {
                console.log("Failed to place bid");
                swal.fire({
                    title: "Failed to Place Bid",
                    icon: "error",
                    toast: true,
                    position: 'top-right',
                    timer: 4000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });


            }
        } catch (error) {
            console.error("Error placing bid:", error);
        }
    };
    

    


    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        makeBid,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}