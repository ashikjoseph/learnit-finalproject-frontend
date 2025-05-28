import React, { useEffect, useState } from 'react';
import { addProfileApi, editUserProfile,  userProfileApi } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';

// Dummy profile image URL or placeholder
const dummyProfileImage = 'https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg';

function Myprofile({ userName, email, onProfileAdded }) {
    const [userProfile, setUserProfile] = useState({
        universityName: '',
        courseName: '',
        syllabus: '',
        collegeName: '',
        paypalEmail: '',       // <-- Added Paypal Email field here
        profileImage: dummyProfileImage // Initialize with dummy profile image
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(dummyProfileImage); // Initialize preview with dummy image URL
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        // Fetch user profile data from API on component mount
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            setError("User is not authenticated.");
            setLoading(false);
            return;
        }

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await userProfileApi(reqHeader);
            if (result.data && result.data.length > 0) {
                setUserProfile(result.data[0]);
                setPreview(`${BASE_URL}/uploads/${result.data[0].profileImage}`);
                setIsEdit(true);
            } else {
                setUserProfile({
                    universityName: '',
                    courseName: '',
                    syllabus: '',
                    collegeName: '',
                    paypalEmail: '',    // Reset Paypal email if no data found
                    profileImage: dummyProfileImage
                });
                setIsEdit(false);
            }
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch user profile.");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile({ ...userProfile, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserProfile({ ...userProfile, profileImage: file });
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        const formData = new FormData();
        formData.append("universityName", userProfile.universityName);
        formData.append("courseName", userProfile.courseName);
        formData.append("syllabus", userProfile.syllabus);
        formData.append("collegeName", userProfile.collegeName);
        formData.append("paypalEmail", userProfile.paypalEmail); // Append Paypal email
        if (userProfile.profileImage instanceof File) {
            formData.append("profileImage", userProfile.profileImage);
        }

  for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
    }
    
        try {
            let response;
            if (isEdit) {
                response = await editUserProfile(userProfile._id, formData, reqHeader);
            } else {
                response = await addProfileApi (formData, reqHeader);
            }

            if (response.status === 200) {
                alert("Profile saved successfully");
                onProfileAdded(); // Refresh profile data after adding/editing profile
            } else {
                alert("Failed to save profile");
            }
        } catch (error) {
            console.error("Failed to save profile:", error);
            alert("Failed to save profile");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="card profile-card" style={{ width: '300px', margin: 'auto' }}>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <label htmlFor="profileImage">
                    <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        className="form-control"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                    <img
                        src={preview}
                        alt="Profile Preview"
                        className="card-img-top rounded-circle"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                </label>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Username: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='username'
                            value={userName}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='email'
                            value={email}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="universityName" className="form-label">University:</label>
                        <input
                            type="text"
                            id="universityName"
                            name="universityName"
                            className="form-control"
                            value={userProfile.universityName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="courseName" className="form-label">Course:</label>
                        <input
                            type="text"
                            id="courseName"
                            name="courseName"
                            className="form-control"
                            value={userProfile.courseName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="syllabus" className="form-label">Syllabus:</label>
                        <input
                            type="text"
                            id="syllabus"
                            name="syllabus"
                            className="form-control"
                            value={userProfile.syllabus}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="collegeName" className="form-label">College:</label>
                        <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            className="form-control"
                            value={userProfile.collegeName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paypalEmail" className="form-label">Paypal Email:</label>
                        <input
                            type="email"
                            id="paypalEmail"
                            name="paypalEmail"
                            className="form-control"
                            value={userProfile.paypalEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {isEdit ? "Update" : "Add"} Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Myprofile;
