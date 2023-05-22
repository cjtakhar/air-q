import "./styles/dash.css"

const Dash = () => {
    return (
        <div className="dash-container">
            <div className="dash-intro">
                <h1 className="dash-title">Welcome to Air Q</h1>
                <p className="dash-text">Track the air quality in your neighborhood.</p>
            </div>
            <div>
                <form className="dash-form">
                    <input className="dash-input" type="text" placeholder="Enter a city or zip code" />
                    <button className="dash-button" type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Dash