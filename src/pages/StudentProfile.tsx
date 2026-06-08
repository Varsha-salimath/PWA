import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import { IconCamera, IconCloudSync, IconPlay } from '../components/icons/Icons'
import '../styles/app.css'
import './pages.css'

const tabs = ['Video Testimonial', 'PTM', 'Principal Review', 'Parent Review', 'General']

const mediaItems = [
  { id: 1, title: 'Video_Testimonial_Final.mp4', image: '/assets/media-video.png', large: true, synced: true, type: 'video' },
  { id: 2, title: 'PTM_Session_Nov.mov', image: '/assets/media-ptm.png', status: 'error' },
  { id: 3, title: 'Principal_Feedback.jpg', image: '/assets/media-principal.png', status: 'review' },
  { id: 4, title: 'Parent_Review_Notes.pdf', image: '/assets/media-parent.png', synced: true },
  { id: 5, title: 'General_Classroom_Misc.mp4', image: '/assets/media-general.png', synced: true },
]

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <AppShell topBarVariant="back" showRefresh showMore activeTab="schools" className="page-profile-detail">
      <div data-node-id="1:385">
        <div className="profile-header">
          <div className="profile-header__avatar">
            <img src="/assets/student-benjamin.png" alt="Benjamin Hayes" />
          </div>
          <div className="profile-header__info">
            <h1 className="page__title">Benjamin Hayes</h1>
            <p className="page__subtitle">Grade 11 • AP Computer Science</p>
            <p className="page__subtitle">Northwest Academy</p>
            <div className="profile-header__badges">
              <span className="badge badge--active">In Progress</span>
              <span className="badge badge--priority">High Priority</span>
            </div>
          </div>
        </div>

        <div className="tab-bar">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={`tab-bar__item ${activeTab === i ? 'tab-bar__item--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="media-grid">
          {mediaItems.map((item) => (
            <div key={item.id} className={`media-card ${item.large ? 'media-card--large' : ''}`}>
              <img src={item.image} alt="" className="media-card__img" />
              {item.synced && (
                <div className="media-card__badge media-card__badge--synced">
                  <IconCloudSync />
                  <span>Synced</span>
                </div>
              )}
              {item.status === 'error' && <div className="media-card__badge media-card__badge--error" />}
              {item.status === 'review' && <div className="media-card__badge media-card__badge--review" />}
              {item.type === 'video' && (
                <div className="media-card__play">
                  <IconPlay />
                </div>
              )}
              <div className="media-card__label">{item.title}</div>
            </div>
          ))}
        </div>

        <div className="capture-cta">
          <button type="button" className="btn-primary">
            <IconCamera />
            Capture New
          </button>
        </div>
      </div>
    </AppShell>
  )
}
