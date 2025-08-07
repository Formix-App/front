"use client"

import { useState } from "react"
import { UserPlus, Info, Pen, Search, Trash2, Download } from "lucide-react"
import { useNavigate } from "react-router-dom"


import "../../assets/styles/PageStyles/EmployeePage/employeepage.css"

const mockEmployees = [
  {
    id: 1,
    name: "Kamran",
    surname: "Əliyev",
    patronymic: "Rasim",
    fin: "EMP1234",
    gender: "Kişi",
    phone: "0551234567",
    dob: "1990-02-10",
    status: "Aktiv",
  },
  {
    id: 2,
    name: "Günay",
    surname: "Quliyeva",
    patronymic: "Fikrət",
    fin: "EMP5678",
    gender: "Qadın",
    phone: "0507654321",
    dob: "1989-09-23",
    status: "Gözləmədə",
  },
  {
    id: 3,
    name: "Murad",
    surname: "Həsənov",
    patronymic: "Sabir",
    fin: "EMP9012",
    gender: "Kişi",
    phone: "0512223344",
    dob: "1985-05-17",
    status: "Aktiv deyil",
  },
]

function EmployeePage() {
  const [searchName, setSearchName] = useState("")
  const [searchSurname, setSearchSurname] = useState("")
  const [searchFin, setSearchFin] = useState("")
  const [searchPhone, setSearchPhone] = useState("")
  const [filterGender, setFilterGender] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [employees, setEmployees] = useState(mockEmployees)

  const filteredEmployees = employees.filter((emp) => {
    const matchesName = emp.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesSurname = emp.surname.toLowerCase().includes(searchSurname.toLowerCase())
    const matchesFin = emp.fin.toLowerCase().includes(searchFin.toLowerCase())
    const matchesPhone = emp.phone.includes(searchPhone)
    const matchesGender = filterGender === "" || emp.gender === filterGender
    const matchesStatus = filterStatus === "" || emp.status === filterStatus

    return matchesName && matchesSurname && matchesFin && matchesPhone && matchesGender && matchesStatus
  })

  const handleDelete = (id) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }
  const navigation = useNavigate()

  return (
    <div className="clients-page">
      <div className="page-header">
        <div className="header-actions">
          <button className="add-client-btn" onClick={()=>(navigation('add'))} >
            <UserPlus size={18} />
            Yeni işçi əlavə et
          </button>
          <button className="download-btn" onClick={() => navigation("/employee/add")}>
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-row">
          <div className="leftPartOfFilter">
            <input
              type="text"
              placeholder="Ad"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="filter-input"
            />
            <input
              type="text"
              placeholder="Soyad"
              value={searchSurname}
              onChange={(e) => setSearchSurname(e.target.value)}
              className="filter-input"
            />
            <input
              type="text"
              placeholder="Fin kodu"
              value={searchFin}
              onChange={(e) => setSearchFin(e.target.value)}
              className="filter-input"
            />
            <input
              type="text"
              placeholder="Mobil nömrə"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="filter-input"
            />
            <Search size={20} className="search-icon" />
          </div>
          <div className="rightPartOfFilter">
            <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} className="filter-select">
              <option value="">Cinsiyyət</option>
              <option value="Kişi">Kişi</option>
              <option value="Qadın">Qadın</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
              <option value="">Status</option>
              <option value="Aktiv">Aktiv</option>
              <option value="Aktiv deyil">Aktiv deyil</option>
              <option value="Gözləmədə">Gözləmədə</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Ata adı</th>
              <th>Fin kodu</th>
              <th>Cinsiyyət</th>
              <th>Mobil nömrə</th>
              <th>Doğum Tarixi</th>
              <th>Status</th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.surname}</td>
                <td>{emp.patronymic}</td>
                <td>{emp.fin}</td>
                <td>{emp.gender}</td>
                <td>{emp.phone}</td>
                <td>{emp.dob}</td>
                <td>
                  <span className={`status-badge ${emp.status.toLowerCase().replace(" ", "-")}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <div className="actions">
                    <button className="action-btn info" title="Məlumat">
                      <Info size={20} />
                    </button>
                    <button className="action-btn edit" title="Redaktə et">
                      <Pen size={20} />
                    </button>
                    <button className="action-btn delete" title="Sil" onClick={() => handleDelete(emp.id)}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="10" className="no-results">
                  Heç bir nəticə tapılmadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeePage
