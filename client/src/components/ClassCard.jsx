import React from 'react';
import { Card, Button } from 'semantic-ui-react';

// import '../css/Class.scss';

function ClassCard(props) {
    const {text} = props;
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Content>
                <Card.Description>
                {text}
                </Card.Description>
                <Button basic color='red'>
                    Delete
                </Button>
            </Card.Content>
        </Card>
    );
}

export default ClassCard;