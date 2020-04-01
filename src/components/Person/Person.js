import React from 'react';
import { useFormik } from 'formik';



const Person = (props) => {

    const users = [...props.users];

    const validate = values => {

        const errors = {};
        if (!values.userId) {
            errors.userId = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            userId: '',
        },
        validate,
        onSubmit: (values, {resetForm}) => {
            // props.handlePersonForm(values);
            resetForm();
            alert(JSON.stringify(values, null, 2))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="userId">User</label>
                <select
                    className="form-control"
                    name="userId"
                    id=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userId}
                >
                    <option value="">Select User</option>
                    {users.map(user=> <option value={user.id}>{user.name}</option>)}
                </select>
                {formik.touched.userId && formik.errors.userId ? (
                    <div style={{color: "red"}}>{formik.errors.userId}</div>
                ) : null}
            </div>
            <button className="btn btn-sm btn-primary" type="submit">Submit</button>

        </form>
    );
};


export default Person;
