
export { Dashboard };

function Dashboard() {
  return (
    <div>
      <header>
        <h2>Dashboard</h2>
        <div>
          <select>
            <option value="1000">1000s</option>
            <option value="5000">5000s</option>
            <option value="10000">10000s</option>
          </select>
          <button>Refresh</button>
        </div>
      </header>
      <section>
        <div className='infoBoxes'>

          <div className='infoBox success'>
            <p>Downloads</p>
            <p>+5%</p>
          </div>

          <div className='infoBox warning'>
            <p>Questions</p>
            <p>-5%</p>
          </div>

          <div className='infoBox info'>
            <p>Views</p>
            <p>+5%</p>
          </div>

          <div className='infoBox error'>
            <p>Performance</p>
            <p>-75%</p>
          </div>

          <div className='infoBox info'>
            <p>Sales</p>
            <p>+5%</p>
          </div>

          <div className='infoBox success'>
            <p>Messages</p>
            <p>+5%</p>
          </div>

        </div>
      </section>
    </div>
  )
}
