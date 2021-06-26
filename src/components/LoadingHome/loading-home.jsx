import logo from '../../img/petflix-logo.png';
import './loading-home.scss';

function LoadingHome() {
    return (
        <div className="loading__wrapper">
            <img alt="logo" src={logo} className="logo"/>
            <div className="loading">
                <div className="circle"/>
                <div className="circle"/>
                <div className="circle"/>
                <div className="circle"/>
                <div className="circle"/>
            </div>
        </div>
    )
}

export default LoadingHome;