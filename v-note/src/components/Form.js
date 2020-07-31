import React, {useState, useContext} from "react";
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const Form = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const firebase = useContext(FirebaseContext);

    const submitHandler = event => {
        event.preventDefault();

        if (value.trim()) {
            firebase.addNote(value.trim()).then(() => {
                alert.show('Вы создали потрясающую заметочку 👌', 'success');
            }).catch( () => {
                alert.show('Упс... Что-то произошло 👎', 'danger');
            });
            setValue();
        } else {
            alert.show('Заметка не хочет быть безымянной, введи название, гнида 🖕');
        }

    };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Введите название заметки"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    )
};
