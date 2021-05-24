import React from 'react'

const ConstraintForm = ({displayConstraintForm}) => {
    if (!displayConstraintForm) {
        return (<div></div>);
    } else {
        return (<div>CONSTRAINTFORM</div>);
    }
}

export default ConstraintForm