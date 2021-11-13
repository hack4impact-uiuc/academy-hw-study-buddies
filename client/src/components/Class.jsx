import React from 'react';
import Card from ''

// import '../css/Class.scss';

function Class (props) {

    const {text} = props;
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Text>
                {text}
                </Card.Text>
                <Button>X</Button>
            </Card.Body>
        </Card>
    );
}

export default Class;