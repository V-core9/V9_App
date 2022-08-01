
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
            <p>Some Info</p>
            <p>+25%</p>
          </div>

          <div className='infoBox info'>
            <p>Some Info</p>
            <p>+5%</p>
          </div>

          <div className='infoBox warning'>
            <p>Some Info</p>
            <p>-5%</p>
          </div>

          <div className='infoBox info'>
            <p>Some Info</p>
            <p>+5%</p>
          </div>

          <div className='infoBox info'>
            <p>Some Info</p>
            <p>+5%</p>
          </div>

          <div className='infoBox info'>
            <p>Some Info</p>
            <p>+5%</p>
          </div>

        </div>
      </section>
    </div>
  )
}
