import React, { useState } from 'react';
import classes from './Income.module.css';
import AddForm from '../Income/AddInputs/AddForm';
import garbage from '../../../UI/Images/garbage.png';
import pencil from '../../../UI/Images/pencil.png';
import save from '../../../UI/Images/save.png';

const Income = (props) => {

    const [edit, setEdit] = useState(null);
    const [editInput, setEditInput] = useState({ id: '', from: '', sum: '' });

    const onChange = () => {
        props.onEditInput(editInput);
        setEdit(null)
        setEditInput({ id: '', from: '', sum: '' })
    }

    const changeEditMode = (id) => {
        if (edit === null) { setEdit(id) }
        if (edit === id) {
            setEdit(null)
        }
    }

    let list = (
        props.incomes().map(ig =>
            (<li
                className={classes.list}
                key={ig.id}
                onMouseEnter={props.hover}
                onMouseLeave={props.unHover}>
                <div className={classes.data}>
                    {ig.id !== edit ?
                        <>
                            <span> <strong>{ig.from}:  </strong></span>
                            <span> {ig.sum}</span>
                        </>
                        : <div>
                            <input
                                className={classes.input}
                                onChange={event => setEditInput({ from: event.target.value, id: ig.id, sum: ig.sum })}
                                placeholder={ig.from}
                                value={editInput.from}
                                required
                                type="string"
                            />
                            <input
                                className={classes.input}
                                onChange={event => setEditInput({ sum: event.target.value, id: ig.id, from: ig.from })}
                                placeholder={ig.sum}
                                value={editInput.sum}
                                type="number"
                                required
                            />
                            <div className={classes.actionsButtons}>
                                <p src={save} alt="MyImage" className={classes.save} onClick={onChange.bind(this, ig.id)} >Save</p>
                            </div>
                        </div>}
                </div>
                <div
                    className={classes.actionsButtons}
                    style={{
                        opacity: props.show ? '1' : '0'
                    }}
                    onMouseEnter={() => props.hover(ig.id)}
                    onMouseLeave={props.unHover}>
                    <img src={pencil} alt="MyImage" className={classes.editIcon} onClick={changeEditMode.bind(this, ig.id)} />
                    <img src={garbage} alt="MyImage" className={classes.deleteIcon} onClick={props.onRemoveItem.bind(this, ig.id)} />
                </div>
            </li>
            ))
    )


    return (
        <div className={classes.incomeSection}>
            <h2><strong>Incomes</strong></h2>
            <AddForm onAddInput={props.onAddInput} />
            <section className={classes.incomeList}>
                <ul className={classes.allList}>
                    {list}
                </ul>
                <button className={classes.moreButton} onClick={props.clicked} >{props.isOpen ? "Show Less" : "Show More"}</button>
            </section>
            <div className={classes.total}>
                <h3>Total:  </h3>
                <p className={classes.totalSum}>{props.incomeSum}</p>
            </div>
        </div>
    )
}

export default Income;

