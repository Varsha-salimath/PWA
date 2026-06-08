import { useState } from 'react'
import { useNavigate } from '../router'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <div className="login" data-node-id="1:2">
      <main className="login__main" data-node-id="1:3">
        <div className="login__container" data-node-id="1:4">
          <header className="login__header" data-node-id="1:5">
            <div className="login__brand" data-node-id="1:6">
              <div className="login__logo-wrap" data-node-id="1:7">
                <div className="login__logo" data-node-id="1:8">
                  <img
                    src="/assets/logo.png"
                    alt="WizKlub Futurz"
                    className="login__logo-img"
                    data-node-id="1:9"
                  />
                </div>
              </div>
              <h1 className="login__title" data-node-id="1:10">
                WizKlub Futurz
              </h1>
            </div>
          </header>

          <form className="login__form" onSubmit={handleSubmit} data-node-id="1:12">
            <div className="login__field" data-node-id="1:13">
              <label className="login__label" htmlFor="userId" data-node-id="1:14">
                User id
              </label>
              <input
                id="userId"
                type="email"
                className="login__input"
                placeholder="instructor@school.edu"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                autoComplete="username"
                data-node-id="1:15"
              />
            </div>

            <div className="login__field" data-node-id="1:18">
              <label className="login__label" htmlFor="password" data-node-id="1:19">
                Password
              </label>
              <div className="login__password-wrap" data-node-id="1:20">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="login__input login__input--password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  data-node-id="1:21"
                />
                <button
                  type="button"
                  className="login__toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  data-node-id="1:24"
                >
                  <img
                    src="/assets/eye-icon.png"
                    alt=""
                    className="login__eye-icon"
                    data-node-id="1:25"
                  />
                </button>
              </div>
            </div>

            <div className="login__remember" data-node-id="1:27">
              <label className="login__toggle-label" data-node-id="1:28">
                <button
                  type="button"
                  role="switch"
                  aria-checked={keepSignedIn}
                  className={`login__toggle ${keepSignedIn ? 'login__toggle--on' : ''}`}
                  onClick={() => setKeepSignedIn((v) => !v)}
                  data-node-id="1:29"
                >
                  <span className="login__toggle-track" data-node-id="1:30" />
                  <span className="login__toggle-knob" data-node-id="1:31" />
                </button>
                <span className="login__toggle-text" data-node-id="1:33">
                  Keep me signed in
                </span>
              </label>
            </div>

            <button type="submit" className="login__submit" data-node-id="1:34">
              Sign In
            </button>
          </form>

          <div className="login__support" data-node-id="1:36">
            <p className="login__support-text" data-node-id="1:38">
              Need technical assistance?{' '}
              <a href="#" className="login__support-link">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="login__footer" data-node-id="1:39">
        <p className="login__copyright" data-node-id="1:41">
          © 2024 WizKlub Futurz. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
