import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomusers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to fetch users");
        }

        return res.json();
      })
      .then((data) => setUsers(data.data.data))
      .catch(() => setError("Could not load users right now."))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="app">
      <section className="users-section">
        <div className="section-heading">
          <p>Team Directory</p>
          <h1>Our Users</h1>
        </div>

        {isLoading && <p className="status-message">Loading users...</p>}
        {error && <p className="status-message error-message">{error}</p>}

        {!isLoading && !error && (
          <div className="user-grid">
            {users.map((user) => (
              <article className="user-card" key={user.login.uuid}>
                <div className="avatar">
                  {user.name.first.charAt(0)}
                  {user.name.last.charAt(0)}
                </div>

                <div className="user-info">
                  <h2>
                    {user.name.first} {user.name.last}
                  </h2>
                  <p>{user.email}</p>
                </div>

                <div className="age-row">
                  <span>Age</span>
                  <strong>{user.dob.age}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
