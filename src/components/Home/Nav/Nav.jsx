import logo from "../../../assets/logo.svg"
import profile from "../../../assets/profile.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

const Nav = ({darkMode,toggleDarkMode}) => {

    return (
        <div className="z-10 flex fixed justify-start items-center space-x-8 md:space-x-12 text-3xl bg-dark-light
            h-auto w-full lg:h-full lg:w-24 lg:flex-col lg:fixed lg:space-y-14 lg:space-x-0 lg:pb-10 lg:rounded-r-2xl">

            <div className="flex lg:flex-col lg:items-center w-4/5 md:w-10/12 lg:h-full pr-7 lg:p-0 lg:w-full
                justify-between items-center border-tint-violet border-r-2 lg:border-b-2 lg:border-r-0">
                
                <img className="lg:h-24" src={logo} alt="logo"/>
                <button className="outline-0" onClick={toggleDarkMode}>
                    {darkMode ? (
                                <FontAwesomeIcon 
                                    icon={faMoon} 
                                    className="hover:text-icon-hover text-2xl text-light-violet lg:mb-10"/>
                                ) 
                            : (
                                <FontAwesomeIcon 
                                icon={faSun} 
                                className="hover:text-icon-hover text-2xl text-light-violet lg:mb-10"/>
                            ) 
                    }
                </button>
            </div>

            <img className="w-8 h-8 lg:h-14 lg:w-auto" src={profile} alt="profile" />
        </div>
    )
}

export default Nav