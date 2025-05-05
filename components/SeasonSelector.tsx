'use client'

import { Select } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SeasonSelector() {
    const router = useRouter();
    const [value, setValue] = useState("2023/24");

    // Update router when dropdown value changes
    useEffect(() => {
        if (value) {
            router.replace(`past-tables/?season=${value}`);
        }
    }, [value, router]);

    const seasonOptions = [
        "2023/24",
        "2022/23",
        "2021/22",
        "2020/21",
        "2019/20",
        "2018/19",
        "2017/18"
    ];

    return (
        <Select
            label='Season'
            data={seasonOptions}
            value={value}
            onChange={(val) => setValue(val!)}
            maxDropdownHeight={200}
        />
    );
}