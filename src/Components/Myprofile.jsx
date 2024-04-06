import React, { useState } from 'react';

function Profile() {
    // Initialize profile data with empty strings or retrieve from localStorage
    const [profileData, setProfileData] = useState({
        fullName: localStorage.getItem('fullName') || '',
        email: localStorage.getItem('email') || '',
        courseName: localStorage.getItem('courseName') || '',
        syllabus: localStorage.getItem('syllabus') || '',
        collegeName: localStorage.getItem('collegeName') || ''
    });

    // Update profile data and localStorage
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
        localStorage.setItem(name, value);
    };

    // Submit profile data (for demonstration purposes)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile data submitted:', profileData);
        // You can perform further actions here, such as sending data to a backend if needed
        
        // Display an alert indicating that the profile has been updated
        alert('Profile has been updated!');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow p-3">
                        <h2 className="text-center">Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Full Name:</label>
                                <input type="text" id="fullName" name="fullName" className="form-control" value={profileData.fullName} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" id="email" name="email" className="form-control" value={profileData.email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="courseName" className="form-label">Course Name:</label>
                                <input type="text" id="courseName" name="courseName" className="form-control" value={profileData.courseName} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="syllabus" className="form-label">Syllabus:</label>
                                <input type="text" id="syllabus" name="syllabus" className="form-control" value={profileData.syllabus} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="collegeName" className="form-label">College Name:</label>
                                <input type="text" id="collegeName" name="collegeName" className="form-control" value={profileData.collegeName} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;






