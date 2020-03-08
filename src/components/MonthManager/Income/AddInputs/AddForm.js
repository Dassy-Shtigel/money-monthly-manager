import React, { useState, useEffect } from 'react';
import classes from './AddIncomeInputs.module.css';


const AddIncomeInputs = React.memo(props => {

    const [enteredSum, setEnteredSum] = useState(null);
    const [enteredFromI, setEnteredFromI] = useState('');
    const [enteredImage, setEnteredImage] = useState('');

    const SubmitHandler = event => {
        event.preventDefault();
        props.onAddInput({ sum: enteredSum, from: enteredFromI, avatar: enteredImage });
        setEnteredSum('')
        setEnteredFromI('')
        setEnteredImage('')
    };
    useEffect(() => {
    }, [enteredImage])

    return (
        <section  >
            <form className={classes.incomeInputForm} onSubmit={SubmitHandler}>
                <div >
                    <input
                        className={classes.input}
                        type="number"
                        required
                        id="sum"
                        placeholder="Sum"
                        value={enteredSum || ''}
                        onChange={event => {
                            setEnteredSum(event.target.value);
                        }} />
                    <input
                        className={classes.input}
                        type="text"
                        id="fromI"
                        placeholder="Title"
                        value={enteredFromI}
                        onChange={event => {
                            setEnteredFromI(event.target.value);
                        }} />
                </div >
                <div >
                    <input
                        type="file"
                        id="avatar"
                        className={classes.uploadButton}
                        onChange={event => {
                            setEnteredImage(event.target.value);
                        }} />
                </div>
                <div >
                    <button type='submit' className={classes.button}>Add</button>
                </div>
            </form>
        </section>)

});

export default AddIncomeInputs;
