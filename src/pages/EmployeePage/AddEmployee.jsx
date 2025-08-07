"use client"

import { useState } from "react"
import { Eye, EyeOff, Upload, User, Save, X } from "lucide-react"
import "../../assets/styles/PageStyles/EmployeePage/addemployee.css"

function AddEmployee() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    fatherName: "",
    surname: "",
    finCode: "",
    gender: "",
    birthDate: "",
    mobileNumber1: "",
    mobileNumber2: "",
    mobileNumber3: "",
    email: "",
    address: "",
    permissions: {
      read: false,
      write: false,
      delete: false,
      admin: false,
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePermissionChange = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission],
      },
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    setImagePreview(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Burada backendə göndərmə və s. əməliyyatlar aparıla bilər
  }

  return (
    <div className="create-employee-page">
      <div className="form-container">
        <div className="form-header">
          <h1>İşçi əlavə et</h1>
          <div className="image-upload-section">
            <div className="image-preview">
              {imagePreview ? (
                <div className="image-container" style={{ position: "relative", width: "96px", height: "96px" }}>
                  <img src={imagePreview} alt="Profile" className="profile-image" style={{ borderRadius: "9999px", width: "100%", height: "100%", objectFit: "cover", border: "4px solid rgba(255, 255, 255, 0.3)" }} />
                  <button type="button" className="remove-image-btn" onClick={removeImage}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="no-image-placeholder">
                  <User size={48} />
                  <span>Şəkil yoxdur</span>
                </div>
              )}
            </div>
            <label className="upload-btn">
              <Upload size={16} />
              Şəkil əlavə et
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label>
                  İstifadəçi adı <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  Şifrə <span className="required">*</span>
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="form-input password-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Ad <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  Soyad <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  Ata adı <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  Cinsiyyət <span className="required">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Cins seçin</option>
                  <option value="Kişi">Kişi</option>
                  <option value="Qadın">Qadın</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  FIN kod <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="finCode"
                  value={formData.finCode}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  maxLength="7"
                />
              </div>

              <div className="form-group">
                <label>
                  Doğum tarixi <span className="required">*</span>
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-column">
          <div className="form-group">
            <label>Mobil nömrə 1 <span className="required">*</span></label>
            <input
              type="tel"
              name="mobileNumber1"
              value={formData.mobileNumber1}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Mobil nömrə 2</label>
            <input
              type="tel"
              name="mobileNumber2"
              value={formData.mobileNumber2}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Mobil nömrə 3</label>
            <input
              type="tel"
              name="mobileNumber3"
              value={formData.mobileNumber3}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Ünvan</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label>İcazələr</label>
            <div className="permissions-grid">
              {Object.keys(formData.permissions).map((permission) => (
                <label key={permission} className="checkbox-label">
                  <input
                    type="checkbox"
                    name={permission}
                    checked={formData.permissions[permission]}
                    onChange={() => handlePermissionChange(permission)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn">Ləğv et</button>
        <button type="submit" className="submit-btn">
          <Save size={16} />
          Yadda saxla
        </button>
      </div>
    </form>
  </div>
</div>
  )}

export default AddEmployee;