"use client"

import { useState } from "react"
import { UserPlus, Info, Pen,Search, Trash2, Download, Users } from "lucide-react"

import "../../assets/styles/PageStyles/ClientsPage/clientspage.css"

const mockClients = [
  {
    id: 1,
    name: "Ali",
    surname: "Valiyev",
    patronymic: "Eldar",
    fin: "ABCD1234",
    gender: "Kişi",
    phone: "0551234567",
    dob: "1990-01-01",
    status: "Aktiv",
  },
  {
    id: 2,
    name: "Lala",
    surname: "Huseynova",
    patronymic: "Samir",
    fin: "EFGH5678",
    gender: "Qadın",
    phone: "0559876543",
    dob: "1995-06-15",
    status: "Gözləmədə",
  },
  {
    id: 3,
    name: "Vahid",
    surname: "Əliyev",
    patronymic: "Zahid",
    fin: "IJKL9012",
    gender: "Kişi",
    phone: "0501112233",
    dob: "1988-12-20",
    status: "Aktiv deyil",
  },
  {
    id: 4,
    name: "Ayşə",
    surname: "Məmmədova",
    patronymic: "Rəşid",
    fin: "MNOP3456",
    gender: "Qadın",
    phone: "0557778899",
    dob: "1992-03-10",
    status: "Aktiv",
  },
  {
    id: 5,
    name: "Rəşad",
    surname: "İbrahimov",
    patronymic: "Mübariz",
    fin: "QRST7890",
    gender: "Kişi",
    phone: "0503334455",
    dob: "1985-08-25",
    status: "Aktiv",
  },
]

function ClientsPage() {
  const [searchName, setSearchName] = useState("")
  const [searchSurname, setSearchSurname] = useState("")
  const [searchFin, setSearchFin] = useState("")
  const [searchPhone, setSearchPhone] = useState("")
  const [filterGender, setFilterGender] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [clients, setClients] = useState(mockClients)

  const filteredClients = clients.filter((client) => {
    const matchesName = client.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesSurname = client.surname.toLowerCase().includes(searchSurname.toLowerCase())
    const matchesFin = client.fin.toLowerCase().includes(searchFin.toLowerCase())
    const matchesPhone = client.phone.includes(searchPhone)
    const matchesGender = filterGender === "" || client.gender === filterGender
    const matchesStatus = filterStatus === "" || client.status === filterStatus

    return matchesName && matchesSurname && matchesFin && matchesPhone && matchesGender && matchesStatus
  })

  const handleDelete = (id) => {
    setClients(clients.filter((c) => c.id !== id))
  }

  return (
    <div className="clients-page">
      <div className="page-header">
        <h1>
        </h1>
        <div className="header-actions">
          <button className="add-client-btn">
            <UserPlus size={18} />
            Yenisini əlavə et
          </button>
          <button className="download-btn">
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
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.surname}</td>
                <td>{client.patronymic}</td>
                <td>{client.fin}</td>
                <td>{client.gender}</td>
                <td>{client.phone}</td>
                <td>{client.dob}</td>
                <td>
                  <span className={`status-badge ${client.status.toLowerCase().replace(" ", "-")}`}>
                    {client.status}
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
                    <button className="action-btn delete" title="Sil" onClick={() => handleDelete(client.id)}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
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

export default ClientsPage