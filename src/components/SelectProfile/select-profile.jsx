
import logo from '../../img/petflix-logo.png';
import add from '../../img/add-icon.svg';
import './select-profile.scss';

function SelectProfile(props) {

        const { setUser } = props;
        
        return (
            <div className="container">

                <nav className="select-profile__navigation-bar">
                    <img className="petflix-logo" src={logo} alt="petflix logo"/>
                </nav>

                <section className="select-profile__whos-watching">

                    <h1>Who's watching?</h1>

                    <div className="select-profile__container">
                        <div onClick={setUser("Rover")}  className="select-profile__container-item">
                            <div className="select-profile__image-background user-profile">
                            </div>
                            <p>Rover</p>
                        </div>
                        <div className="select-profile__container-item">
                            <div className="select-profile__image-background pups-profile">
                            </div>
                            <p>Pups</p>
                        </div>
                        <div className="select-profile__container-item">
                            <div className="select-profile__image-background add-profile">
                                <img src={add} alt="add icon"/>
                            </div>
                            <p>Add Profile</p>
                        </div>
                    </div>

                    <button className="select-profile__manage-profiles-btn">Manage Profiles</button>
                </section>

            </div>
        )
}

export default SelectProfile;