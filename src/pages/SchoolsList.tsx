import AppShell from '../components/layout/AppShell'
import { IconChevronRight } from '../components/icons/Icons'
import { useNavigate } from '../router'
import '../styles/app.css'
import './pages.css'

const allSchools = [
  { id: 'westside', name: 'Westside Tech High', district: 'District 4', students: 240, image: '/assets/school-campus.png' },
  { id: 'oakwood', name: 'Oakwood Academy', district: 'District 7', students: 112, image: '/assets/university-library.png' },
  { id: 'lincoln', name: 'Lincoln Elementary', district: 'District 2', students: 318, image: '/assets/elementary-hallway.png' },
  { id: 'greenwood', name: 'Greenwood High', district: 'District 1', students: 480, image: '/assets/school-campus.png' },
  { id: 'northwest', name: 'Northwest Academy', district: 'District 3', students: 195, image: '/assets/university-library.png' },
  { id: 'st-patricks', name: "St. Patrick's Global", district: 'District 5', students: 614, image: '/assets/elementary-hallway.png' },
]

export default function SchoolsList() {
  const navigate = useNavigate()

  return (
    <AppShell topBarVariant="back" activeTab="schools" className="page-schools-list">
      <div className="page" data-node-id="1:772">
        <header className="page-header-block">
          <h1 className="page__title page__title--sm">All Schools</h1>
          <p className="page__subtitle">12 schools assigned to your field visits this cycle.</p>
        </header>

        <div className="schools-list">
          {allSchools.map((school) => (
            <button
              key={school.id}
              type="button"
              className="school-card card"
              onClick={() => navigate('/batches')}
            >
              <div className="school-thumb">
                <img src={school.image} alt="" />
              </div>
              <div className="school-card__info">
                <p className="school-card__name">{school.name}</p>
                <p className="school-card__meta">
                  {school.district} • {school.students} Students
                </p>
              </div>
              <IconChevronRight />
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
