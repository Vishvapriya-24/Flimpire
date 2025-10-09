const NotificationsSettings = () => {
  return (
    <div style={{ padding: "20px" }}>
      <section>
        <h2>Notifications</h2>
        <p>Manage your notification preferences below:</p>

        <div style={{ marginTop: "15px" }}>
          <label>
            <input type="checkbox" /> Email Notifications
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            <input type="checkbox" /> Push Notifications
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            <input type="checkbox" /> SMS Notifications
          </label>
        </div>
      </section>
    </div>
  );
};

const AccountsSettings = ()=>{
  return(
    <p>Accounts settings</p>
  );
}


// General Settings
const GeneralSettings = () => {
  return (
    <div style={{ padding: "20px" }}>
      <section>
        <h2>General</h2>
        <p>Update your general application preferences.</p>

        <div style={{ marginTop: "15px" }}>
          <label>
            <input type="checkbox" /> Enable Dark Mode
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            <input type="checkbox" /> Show Tooltips
          </label>
        </div>
      </section>
    </div>
  );
};

// Mail Settings
const MailSettings = () => {
  return (
    <div style={{ padding: "20px" }}>
      <section>
        <h2>Mail</h2>
        <p>Configure your mail preferences.</p>

        <div style={{ marginTop: "15px" }}>
          <label>
            Signature: <input type="text" placeholder="Your signature" />
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            <input type="checkbox" /> Enable Auto-Reply
          </label>
        </div>
      </section>
    </div>
  );
};

// Calendar Settings
const CalendarSettings = () => {
  return (
    <div style={{ padding: "20px" }}>
      <section>
        <h2>Calendar</h2>
        <p>Adjust your calendar settings.</p>

        <div style={{ marginTop: "15px" }}>
          <label>
            Default View: 
            <select style={{ marginLeft: "10px" }}>
              <option>Month</option>
              <option>Week</option>
              <option>Day</option>
            </select>
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            <input type="checkbox" /> Show Public Holidays
          </label>
        </div>
      </section>
    </div>
  );
};

// People Settings
const PeopleSettings = () => {
  return (
    <div style={{ padding: "20px" }}>
      <section>
        <h2>People</h2>
        <p>Manage your contacts and groups.</p>

        <div style={{ marginTop: "15px" }}>
          <button>Add New Contact</button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <button>Manage Groups</button>
        </div>
      </section>
    </div>
  );
};

// Copilot Settings
const CopilotSettings = () => {
  return (
    <div style={{ padding: "20px" }}>
      <section>
        <h2>Copilot</h2>
        <p>Configure Copilot preferences.</p>

        <div style={{ marginTop: "15px" }}>
          <label>
            <input type="checkbox" /> Enable Copilot Assistance
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            <input type="checkbox" /> Show Suggestions Automatically
          </label>
        </div>
      </section>
    </div>
  );
};

export {
  NotificationsSettings,
  AccountsSettings,
  GeneralSettings,
  MailSettings,
  CalendarSettings,
  PeopleSettings,
  CopilotSettings
};

