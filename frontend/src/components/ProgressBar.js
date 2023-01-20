import React from 'react';
import { Progress, Space } from 'antd';

const ProgressBar = (props) => {

    const { value } = props;
    return (
        <Space wrap>
            <Progress type="circle" percent={value} />
            {/* <Progress type="circle" percent={70} status="exception" /> */}
            {/* <Progress type="circle" percent={15} /> */}
            {/* Number of tasks not started divided by the number of tasks completed * 100 */}

        </Space>
    );
}
export default ProgressBar;