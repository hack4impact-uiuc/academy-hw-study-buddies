import React from 'react';
import { Card } from 'semantic-ui-react';

import '../css/ClassPageCard.scss';

function ClassPageCard(props) {
    const { course, classMembers } = props;
    return (
    <>
    <Card>
        <Card.Content>
            <Card.Header>{course}</Card.Header>
            <Card.Description className="class-text">
                {classMembers}
            </Card.Description>
        </Card.Content>
    </Card>           
    </>
    );
}

export default ClassPageCard;
