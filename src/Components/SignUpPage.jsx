import React , {useContext, useState ,useEffect} from 'react'
import ErrorContext from '../Contexts/ErrorContext'
import mailImage from "../usedImages/mail_illustartion.png"
import "../Component_styles/SignUpPage_styles.css"

function SignUpPage() {
    const cont = useContext(ErrorContext);

    //funtion and state fr our input field...
    const [mail ,setMail] = useState("");
    const getMail = (e) => {
        setMail(e.target.value)
    }
    console.log(mail);

    const formSubbed= (e) => {
        e.preventDefault();
        //now we have to make our post request here and redirect user...
    }


    return (
    <>
        <div>

            <div className="signup-card-cont ">
                <form className="signup-card " onSubmit={formSubbed} >
                    <div align='center'>
                        <img draggable='false' id='imageCard' src={mailImage} alt="!oopps" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="mail">Email</label>
                        <input type="email" id="mail" spellCheck='false' onChange={getMail} value={mail} />
                    </div>
                    <button> Sign Up </button>
                </form>
            </div>

        </div>
    </>
    )
}

export default SignUpPage
