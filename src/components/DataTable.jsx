import { Table } from 'antd';
import qs from 'qs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)``;
const columns = [
    {
        title: '순위',
        dataIndex: 'rank',
        defaultSortOrder: 'descend',
        sorter: true,
        width: '7%',
    },
    {
        title: '과목명',
        dataIndex: 'name',
        // render: (name) => `${name.first} ${name.last}`,
        render: (name) => <Link to="/detail">{name.last}</Link>,
        width: '10%',
    },
    {
        title: '과목번호',
        dataIndex: 'rank',
        defaultSortOrder: 'descend',
        sorter: true,
        width: '10%',
    },
    {
        title: '교과구분',
        dataIndex: 'type',
        filters: [
            {
                text: '전공',
                value: '전공',
            },
            {
                text: '공학전공',
                value: '공학전공',
            },
            {
                text: '교양',
                value: '교양',
            },
        ],
        width: '10%',
    },
    {
        title: '교수님',
        dataIndex: 'gender',
        filters: [
            {
                text: 'Male',
                value: 'male',
            },
            {
                text: 'Female',
                value: 'female',
            },
        ],
        width: '10%',
    },
    {
        title: '학점',
        dataIndex: 'rank',
        defaultSortOrder: 'descend',
        sorter: true,
    },
    {
        title: '정원',
        dataIndex: 'rank',
        defaultSortOrder: 'descend',
        sorter: true,
    },
    {
        title: '수강학년',
        dataIndex: 'rank',
        defaultSortOrder: 'descend',
        sorter: true,
    },
    {
        title: '선호도',
        dataIndex: 'rank',
        defaultSortOrder: 'descend',
        sorter: true,
    },
];
const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});
const DataTable = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const fetchData = () => {
        setLoading(true);
        fetch(
            `https://randomuser.me/api?${qs.stringify(
                getRandomuserParams(tableParams)
            )}`
        )
            .then((res) => res.json())
            .then(({ results }) => {
                console.log(results);
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 100,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    return (
        <StyledTable
            columns={columns}
            rowKey={(record) => record.login.uuid}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};
export default DataTable;
