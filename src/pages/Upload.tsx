import AppShell from '../components/layout/AppShell'
import { IconCloudSync, IconUpload } from '../components/icons/Icons'
import '../styles/app.css'
import './pages.css'

const recentUploads = [
  { name: 'Video_Testimonial_Final.mp4', school: 'Greenwood High', time: '2 hours ago', status: 'synced' as const },
  { name: 'PTM_Session_Nov.mov', school: 'Westside Tech High', time: '5 hours ago', status: 'pending' as const },
  { name: 'Principal_Feedback.jpg', school: 'Oakwood Academy', time: 'Yesterday', status: 'synced' as const },
  { name: 'Parent_Review_Notes.pdf', school: 'Lincoln Elementary', time: 'Yesterday', status: 'synced' as const },
]

export default function Upload() {
  return (
    <AppShell topBarVariant="back" activeTab="upload" className="page-upload">
      <div className="page" data-node-id="1:642">
        <header className="page-header-block">
          <h1 className="page__title page__title--sm">Upload Media</h1>
          <p className="page__subtitle">
            Capture and sync student testimonials, PTM sessions, and review materials.
          </p>
        </header>

        <div className="upload-zone card">
          <div className="upload-zone__icon">
            <IconUpload size={32} />
          </div>
          <p className="upload-zone__title">Drop files here or tap to browse</p>
          <p className="upload-zone__hint">Supports MP4, MOV, JPG, PNG, PDF up to 500MB</p>
          <button type="button" className="btn-primary upload-zone__btn">
            Select Files
          </button>
        </div>

        <section className="upload-recent">
          <h2 className="section-title">Recent Uploads</h2>
          <div className="upload-list">
            {recentUploads.map((item) => (
              <div key={item.name} className="upload-item card">
                <div className="upload-item__info">
                  <p className="upload-item__name">{item.name}</p>
                  <p className="upload-item__meta">
                    {item.school} • {item.time}
                  </p>
                </div>
                <span className={`badge ${item.status === 'synced' ? 'badge--uploaded' : 'badge--pending'}`}>
                  {item.status === 'synced' ? (
                    <>
                      <IconCloudSync size={12} /> Synced
                    </>
                  ) : (
                    'Pending'
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  )
}
