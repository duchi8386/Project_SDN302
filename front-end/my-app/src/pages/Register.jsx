import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {register} from "../services/AuthService.js"
import {FaEnvelope, FaHome, FaLock, FaPhone, FaUser} from "react-icons/fa";

const Register = () => {
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(userData);
            navigate("/login");
        } catch (error) {
            setError(error);
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center bg-light">
            <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Đăng Ký</h2>

                {error && <p className="alert alert-danger">{error}</p>}

                <form onSubmit={handleRegister}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaUser /></span>
                        <input type="text" className="form-control" name="fullName" placeholder="Họ và tên" onChange={handleChange} required />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaEnvelope /></span>
                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaLock /></span>
                        <input type="password" className="form-control" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaPhone /></span>
                        <input type="text" className="form-control" name="phoneNumber" placeholder="Số điện thoại" onChange={handleChange} required />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaHome /></span>
                        <input type="text" className="form-control" name="address" placeholder="Địa chỉ" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Đăng Ký</button>

                    <div className="text-center mt-3">
                        <a href="/login" className="text-decoration-none">Đã có tài khoản? Đăng nhập</a>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default Register;