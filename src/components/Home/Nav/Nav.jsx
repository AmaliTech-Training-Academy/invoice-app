import logo from "/assets/logo.svg"
import profile from "/assets/image-avatar.jpg"
import moon from "/assets/icon-moon.svg"
import iconSun from "/assets/icon-sun.svg"

const Nav = ({darkMode,toggleDarkMode}) => {

    return (
        <div className="z-10 flex fixed justify-start items-center space-x-8 md:space-x-12 text-3xl bg-dark-light
            h-auto w-full lg:h-full lg:w-24 lg:flex-col lg:fixed lg:space-y-14 lg:space-x-0 lg:pb-10 lg:rounded-r-2xl">

            <div className="flex lg:flex-col lg:items-center w-4/5 md:w-10/12 lg:h-full pr-7 lg:p-0 lg:w-full
                justify-between items-center border-tint-violet border-r-2 lg:border-b-2 lg:border-r-0">
                
                <div className="rounded-br-2xl rounded-tr-2xl lg:h-24 flex flex-col items-center 
                    justify-center bg-dark-violet md:w-24 w-24 h-20 lg:w-full relative">
                    <img className="z-10" src={logo} alt="logo"/>
                    <div className="z-auto rounded-br-3xl rounded-tl-2xl 
                        bottom-0 absolute h-1/2 w-full bg-light-violet"></div>
                </div>
                <button className="outline-0" onClick={toggleDarkMode}>
                    {
                        darkMode 
                        ? <img src={moon} className="hover:text-icon-hover text-2xl text-light-violet lg:mb-10"/> 
                        : <img src={iconSun} className="hover:text-icon-hover text-2xl text-light-violet lg:mb-10"/>
                    }
                </button>
            </div>

            <img className="rounded-full w-12 lg:h-14 lg:w-auto" src={profile} alt="profile" />
        </div>
    )
}

export default Nav