import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../services/AuthService.js";
import {jwtDecode} from "jwt-decode";
import {FaEnvelope, FaLock} from "react-icons/fa";
import {useAuth} from "../context/AuthContext.jsx";

const Login = () => {
    const { loginUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);
            const token = userData.token;
            await loginUser(token);
            const decodedToken = jwtDecode(userData.token);
            const userRole = decodedToken.role;

            if (userRole === "ADMIN") {
                navigate("/admin/products");
            } else {
                navigate("/home");
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center bg-light">
            <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Đăng Nhập</h2>

                {error && <p className="alert alert-danger">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaEnvelope /></span>
                        <input type="email" className="form-control" placeholder="Email" value={email}
                               onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaLock /></span>
                        <input type="password" className="form-control" placeholder="Mật khẩu" value={password}
                               onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Đăng Nhập</button>

                    <div className="text-center mt-3">
                        <a href="#" className="text-decoration-none">Quên mật khẩu?</a> | <a href="/register" className="text-decoration-none">Đăng ký</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;