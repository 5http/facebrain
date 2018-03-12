import React from 'react';

const Rank = ({name, entries}) => {

    return (
        <div>
            <div className="white f3">
                <b>{name}</b>, your current entry count is...
            </div>
            <div className="white f1 pt3 b">
                {entries}
            </div>
        </div>
    );

}

export default Rank;