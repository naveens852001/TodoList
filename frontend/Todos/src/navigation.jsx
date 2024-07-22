import React from 'react';
import { NavLink } from 'react-router-dom';
import './todo.css';
import { useEffect,useState } from 'react';

function Navigation() {
    const [themeText, setThemeText] = useState('Light');
    useEffect(() => {
        const icon = document.getElementById('icon');
        if (icon) {
            icon.onclick = function() {
                document.body.classList.toggle('dark-theme');
                if(document.body.classList.contains('dark-theme')){
                    icon.src="./public/img/sun.png"
                    setThemeText('Dark');
                }else{
                     icon.src="./public/img/moon.png"
                     setThemeText('Light');
                }
            };
        }
    }, []);
    return (
        <div className='nav'>
            <ul>
                <li>
                    <NavLink to="/" className="logo" >
                        Listify
                    </NavLink>
                </li>

                <li>
                <div className="icon-text-container">
                            <img src="./img/moon.png" id="icon" alt="Theme Icon" />
                            <span className='themetext'>{themeText}     </span>
                </div>
                </li>
               
            </ul>
        </div>
    );
}

export default Navigation;
