import React from 'react';
import { useFormik } from 'formik';



const User = (props) => {
    const users = [...props.users];
    const validate = values => {

        const ch = users.find(user => user.name === values.name);

        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        } else if (ch){
            errors.name = 'Name Already Added';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validate,
        onSubmit: (values, {resetForm}) => {
            props.handleUser(values);
            resetForm();
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                    className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div style={{color: "red"}}>{formik.errors.name}</div>
                ) : null}
            </div>

            <div className="form-group">

                <label htmlFor="email">Email Address</label>
                <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div style={{color: "red"}}>{formik.errors.email}</div>
                ) : null}
            </div>

            <button className="btn btn-sm btn-primary" type="submit">Submit</button>
        </form>
    );
};


export default User;
